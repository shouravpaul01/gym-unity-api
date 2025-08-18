"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const updateUserInto = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { userId } = req.params;
    const result = await user_service_1.UserService.updateUserIntoDB(userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Updated successfully.",
        data: result,
    });
});
const getAllUsers = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserService.getAllUsersDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully retrieved",
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserService.getSingleUserDB(req.params.email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully retrieved",
        data: result,
    });
});
const updateUserRole = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { userId } = req.params;
    const { role } = req.query;
    const result = await user_service_1.UserService.updateUserRoleDB(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully updated the role.",
        data: result,
    });
});
const updateStatus = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { userId } = req.params;
    const { isBlocked } = req.query;
    const result = await user_service_1.UserService.updateStatusDB(userId, isBlocked);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result?.isBlocked ? "User blocked successfully." : "User unblocked successfully.",
        data: result,
    });
});
exports.UserController = {
    updateUserInto,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    updateStatus
};
//# sourceMappingURL=user.controller.js.map