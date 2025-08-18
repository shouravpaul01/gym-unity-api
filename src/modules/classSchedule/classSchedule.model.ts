import { model, Schema, Types, Document } from "mongoose";
import { IClassSchedule } from "./classSchedule.interface";

const ClassScheduleSchema = new Schema<IClassSchedule>(
  {
    date: { type: Date, required: true },
    startTime: { type: Schema.Types.Mixed, required: true }, // Can accept string or Date
    endTime: { type: Date },
    trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trainees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ClassScheduleSchema.pre(
  "save",
  async function (this: IClassSchedule & Document, next) {
    try {
      if (this.isModified("date") || this.isModified("startTime")) {
        const dateStr = this.date.toISOString().split("T")[0];
        const timeStr = (this as any).startTime;
        if (typeof (this as any).startTime === "string") {
          const combinedDateTime = `${dateStr} ${timeStr}`;
          const parsedDateTime = new Date(combinedDateTime);

          if (isNaN(parsedDateTime.getTime())) {
            return next(
              new Error(
                `Invalid time format: ${timeStr}. Please use format like "8:06 PM" or "20:06"`
              )
            );
          }

          this.startTime = parsedDateTime;
        }

        // Auto-calculate endTime (2 hours after startTime)
        if (this.startTime instanceof Date) {
          const newEndTime = new Date(`${dateStr} ${timeStr}`);
          newEndTime.setHours(newEndTime.getHours() + 2);
          this.endTime = newEndTime;
        }
      }

      // 2. Validate trainee count
      if (this.trainees && this.trainees.length > 10) {
        return next(
          new Error("A class schedule cannot have more than 10 trainees.")
        );
      }

      // 3. Validate duration only if both times exist and are Date objects
      if (this.startTime instanceof Date && this.endTime instanceof Date) {
        const duration =
          (this.endTime.getTime() - this.startTime.getTime()) /
          (1000 * 60 * 60);
        if (Math.abs(duration - 2) > 0.01) {
          // Allow small floating point differences
          return next(new Error("Each class must be exactly 2 hours long."));
        }
      }

      // 4. Daily class limit validation
      const startOfDay = new Date(this.date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(this.date);
      endOfDay.setHours(23, 59, 59, 999);

      const count = await ClassSchedule.countDocuments({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        isDeleted: { $ne: true },
        _id: { $ne: this._id },
      });

      if (count >= 5) {
        return next(new Error("Maximum 5 classes can be scheduled per day."));
      }

      if (
        this.trainer &&
        this.startTime instanceof Date &&
        this.endTime instanceof Date
      ) {
        const overlappingClasses = await ClassSchedule.find({
          trainer: this.trainer,
          isDeleted: { $ne: true },
          _id: { $ne: this._id },
          startTime: { $lt: this.endTime },
          endTime: { $gt: this.startTime },
        });

        if (overlappingClasses.length > 0) {
          return next(
            new Error("Trainer already has a class scheduled at this time.")
          );
        }
      }

      next();
    } catch (error: any) {
      next(error);
    }
  }
);

// Add index for better query performance
ClassScheduleSchema.index({ date: 1, trainer: 1 });
ClassScheduleSchema.index({ date: 1, isDeleted: 1 });

export const ClassSchedule = model<IClassSchedule>(
  "ClassSchedule",
  ClassScheduleSchema
);
