import { Types } from "mongoose";

export interface IClassSchedule {
  _id: Types.ObjectId;
  date: Date;
  startTime: Date;
  endTime: Date;
  trainer: Types.ObjectId;
  trainees: Types.ObjectId[];
}
