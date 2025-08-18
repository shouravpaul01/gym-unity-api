"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleService = void 0;
const classSchedule_model_1 = require("./classSchedule.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const createClassScheduleDB = async (payload) => {
    const result = await classSchedule_model_1.ClassSchedule.create(payload);
    return result;
};
// Get all class schedules
const getAllClassSchedulesDB = async (query) => {
    const searchableFields = [
        "date",
        "startTime",
        "endTime",
        "trainer",
        "trainees",
    ];
    const mainQuery = new QueryBuilder_1.QueryBuilder(classSchedule_model_1.ClassSchedule.find({}).populate("trainer").populate("trainees"), query).search(searchableFields);
    const totalPages = (await mainQuery.totalPages()).totalQuery;
    const paginateQuery = mainQuery.paginate();
    const classSchedules = await paginateQuery.modelQuery;
    const result = { data: classSchedules, totalPages: totalPages };
    return result;
};
const getClassScheduleByIdDB = async (id) => {
    const result = await classSchedule_model_1.ClassSchedule.findById(id)
        .populate("trainer")
        .populate("trainees")
        .exec();
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "classScheduleError", "Class schedule not found.");
    }
    return result;
};
// Update a class schedule by ID
const updateClassScheduleDB = async (classScheduleId, payload) => {
    const isExists = await classSchedule_model_1.ClassSchedule.exists({ _id: classScheduleId });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "classScheduleError", "Class schedule not found.");
    }
    const result = await classSchedule_model_1.ClassSchedule.findByIdAndUpdate(classScheduleId, payload, { new: true })
        .populate("trainer")
        .populate("trainees")
        .exec();
    return result;
};
// Delete a class schedule by ID
const updateStatusDB = async (classScheduleId, isActive) => {
    const isExists = await classSchedule_model_1.ClassSchedule.exists({ _id: classScheduleId });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "classScheduleError", "Class schedule not found.");
    }
    const result = await classSchedule_model_1.ClassSchedule.findByIdAndUpdate(classScheduleId, { isActive }, { new: true })
        .populate("trainer")
        .populate("trainees")
        .exec();
    return result;
};
exports.ClassScheduleService = {
    createClassScheduleDB,
    getAllClassSchedulesDB,
    getClassScheduleByIdDB,
    updateClassScheduleDB,
    updateStatusDB,
};
//# sourceMappingURL=classSchedule.service.js.map