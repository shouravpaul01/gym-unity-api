"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const classSchedule_service_1 = require("./classSchedule.service");
// Create
const createClassSchedule = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await classSchedule_service_1.ClassScheduleService.createClassScheduleDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Class schedule created successfully.",
        data: result,
    });
});
// Get all
const getAllClassSchedules = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await classSchedule_service_1.ClassScheduleService.getAllClassSchedulesDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Class schedules retrieved successfully.",
        data: result,
    });
});
// Get single
const getClassScheduleById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { classScheduleId } = req.params;
    const result = await classSchedule_service_1.ClassScheduleService.getClassScheduleByIdDB(classScheduleId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Class schedule retrieved successfully.",
        data: result,
    });
});
// Update
const updateClassSchedule = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { classScheduleId } = req.params;
    const result = await classSchedule_service_1.ClassScheduleService.updateClassScheduleDB(classScheduleId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Class schedule updated successfully.",
        data: result,
    });
});
const updateClassScheduleStatus = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { classScheduleId } = req.params;
    const { isActive } = req.query;
    const result = await classSchedule_service_1.ClassScheduleService.updateStatusDB(classScheduleId, isActive);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Class schedule status updated successfully.",
        data: result,
    });
});
exports.ClassScheduleController = {
    createClassSchedule,
    getAllClassSchedules,
    getClassScheduleById,
    updateClassSchedule,
    updateClassScheduleStatus,
};
//# sourceMappingURL=classSchedule.controller.js.map