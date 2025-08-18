"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.patch("/update-user/:userId", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.updateUserInto);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getAllUsers);
router.get("/single-user/:email", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getSingleUser);
router.patch("/update-role/:userId", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.updateUserRole);
router.patch("/update-status/:userId", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.updateStatus);
exports.UserRoutes = router;
//# sourceMappingURL=user.route.js.map