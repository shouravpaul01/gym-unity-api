import { ClassSchedule } from "./classSchedule.model";
import { IClassSchedule } from "./classSchedule.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";

const createClassScheduleDB = async (payload: IClassSchedule) => {
  const result = await ClassSchedule.create(payload);
  return result;
};

// Get all class schedules
const getAllClassSchedulesDB = async (query: Record<string, undefined>) => {
  const searchableFields = [
    "date",
    "startTime",
    "endTime",
    "trainer",
    "trainees",
  ];
  const mainQuery = new QueryBuilder(
    ClassSchedule.find({}).populate("trainer").populate("trainees"),
    query
  ).search(searchableFields);
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const paginateQuery = mainQuery.paginate();
  const classSchedules = await paginateQuery.modelQuery;
  const result = { data: classSchedules, totalPages: totalPages };

  return result;
};

const getClassScheduleByIdDB = async (id: string) => {
  const result = await ClassSchedule.findById(id)
    .populate("trainer")
    .populate("trainees")
    .exec();
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "classScheduleError",
      "Class schedule not found."
    );
  }
  return result;
};

// Update a class schedule by ID
const updateClassScheduleDB = async (
  classScheduleId: string,
  payload: Partial<IClassSchedule>
) => {
  const isExists = await ClassSchedule.exists({ _id: classScheduleId });
  if (!isExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "classScheduleError",
      "Class schedule not found."
    );
  }
  const result = await ClassSchedule.findByIdAndUpdate(
    classScheduleId,
    payload,
    { new: true }
  )
    .populate("trainer")
    .populate("trainees")
    .exec();

  return result;
};

// Delete a class schedule by ID
const updateStatusDB = async (classScheduleId: string, isActive: string) => {
  const isExists = await ClassSchedule.exists({ _id: classScheduleId });
  if (!isExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "classScheduleError",
      "Class schedule not found."
    );
  }
  const result = await ClassSchedule.findByIdAndUpdate(
    classScheduleId,
    { isActive },
    { new: true }
  )
    .populate("trainer")
    .populate("trainees")
    .exec();
  return result;
};

export const ClassScheduleService = {
  createClassScheduleDB,
  getAllClassSchedulesDB,
  getClassScheduleByIdDB,
  updateClassScheduleDB,
  updateStatusDB,
};
