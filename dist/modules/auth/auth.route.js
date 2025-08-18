"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_validation_1 = __importDefault(require("./auth.validation"));
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.validateRequest)(auth_validation_1.default.registerValidation), auth_controller_1.AuthController.register);
router.post("/login", (0, validateRequest_1.validateRequest)(auth_validation_1.default.loginValidation), auth_controller_1.AuthController.login);
exports.AuthRoute = router;
//# sourceMappingURL=auth.route.js.map