"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const classSchedule_controller_1 = require("./classSchedule.controller");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), classSchedule_controller_1.ClassScheduleController.createClassSchedule);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), classSchedule_controller_1.ClassScheduleController.getAllClassSchedules);
router.get("/single-class-schedule/:classScheduleId", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), classSchedule_controller_1.ClassScheduleController.getClassScheduleById);
router.patch("/update-user/:classScheduleId", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), classSchedule_controller_1.ClassScheduleController.updateClassSchedule);
router.patch("/update-status/:classScheduleId", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), classSchedule_controller_1.ClassScheduleController.updateClassScheduleStatus);
exports.ClassScheduleRoutes = router;
//# sourceMappingURL=classSchedule.route.js.map