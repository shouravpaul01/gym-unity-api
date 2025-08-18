"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const register = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await (0, auth_service_1.registerDB)(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Registration completed successfully.",
        data: result,
    });
});
const login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await (0, auth_service_1.loginDB)(req.body);
    const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
    res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: oneWeekMs,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Login successful",
        data: result,
    });
});
exports.AuthController = { register, login };
//# sourceMappingURL=auth.controller.js.map