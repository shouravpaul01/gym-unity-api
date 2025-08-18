import express from "express";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ClassSchedule } from "./classSchedule.model";
import { ClassScheduleController } from "./classSchedule.controller";

const router = express.Router();
router.post(
  "/create",
  auth(USER_ROLE.admin),
  ClassScheduleController.createClassSchedule
);
router.get(
  "/",
  auth(USER_ROLE.admin),
  ClassScheduleController.getAllClassSchedules
);
router.get(
  "/single-class-schedule/:classScheduleId",
  auth(USER_ROLE.admin),
  ClassScheduleController.getClassScheduleById
);
router.patch(
  "/update-user/:classScheduleId",
  auth(USER_ROLE.admin),
  ClassScheduleController.updateClassSchedule
);

router.patch(
  "/update-status/:classScheduleId",
  auth(USER_ROLE.admin),
  ClassScheduleController.updateClassScheduleStatus
);
export const ClassScheduleRoutes = router;
