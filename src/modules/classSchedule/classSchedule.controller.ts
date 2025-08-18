import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ClassScheduleService } from "./classSchedule.service";


// Create
const createClassSchedule = catchAsync(async (req, res) => {
  const result = await ClassScheduleService.createClassScheduleDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Class schedule created successfully.",
    data: result,
  });
});

// Get all
const getAllClassSchedules = catchAsync(async (req, res) => {
  const result = await ClassScheduleService.getAllClassSchedulesDB(req.query as Record<string, undefined>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class schedules retrieved successfully.",
    data: result,
  });
});

// Get single
const getClassScheduleById = catchAsync(async (req, res) => {
  const { classScheduleId } = req.params;
  const result = await ClassScheduleService.getClassScheduleByIdDB(classScheduleId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class schedule retrieved successfully.",
    data: result,
  });
});

// Update
const updateClassSchedule = catchAsync(async (req, res) => {
  const { classScheduleId } = req.params;
  const result = await ClassScheduleService.updateClassScheduleDB(classScheduleId as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class schedule updated successfully.",
    data: result,
  });
});


const updateClassScheduleStatus = catchAsync(async (req, res) => {
  const { classScheduleId } = req.params;
  const { isActive } = req.query;
  const result = await ClassScheduleService.updateStatusDB(
    classScheduleId as string,
    isActive as any
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class schedule status updated successfully.",
    data: result,
  });
});

export const ClassScheduleController = {
  createClassSchedule,
  getAllClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  updateClassScheduleStatus
,
};
