import { IClassSchedule } from "./classSchedule.interface";
export declare const ClassScheduleService: {
    createClassScheduleDB: (payload: IClassSchedule) => Promise<import("mongoose").Document<unknown, {}, IClassSchedule, {}, {}> & IClassSchedule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllClassSchedulesDB: (query: Record<string, undefined>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IClassSchedule, {}, {}> & IClassSchedule & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        totalPages: number;
    }>;
    getClassScheduleByIdDB: (id: string) => Promise<import("mongoose").Document<unknown, {}, IClassSchedule, {}, {}> & IClassSchedule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateClassScheduleDB: (classScheduleId: string, payload: Partial<IClassSchedule>) => Promise<(import("mongoose").Document<unknown, {}, IClassSchedule, {}, {}> & IClassSchedule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateStatusDB: (classScheduleId: string, isActive: string) => Promise<(import("mongoose").Document<unknown, {}, IClassSchedule, {}, {}> & IClassSchedule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=classSchedule.service.d.ts.map