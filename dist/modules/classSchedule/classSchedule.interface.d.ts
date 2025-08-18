import { Types } from "mongoose";
export interface IClassSchedule {
    _id: Types.ObjectId;
    date: Date;
    startTime: Date;
    endTime: Date;
    trainer: Types.ObjectId | string;
    trainees: Types.ObjectId[];
    description?: string;
    isActive: boolean;
    isDeleted: boolean;
}
//# sourceMappingURL=classSchedule.interface.d.ts.map