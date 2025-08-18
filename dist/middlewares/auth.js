"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = require("../utils/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const verifyToken_1 = __importDefault(require("../utils/verifyToken"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, '', "You are not authorized!");
        }
        // checking if the given token is valid
        const decoded = (0, verifyToken_1.default)(token, "You are not authorized!");
        const { role } = decoded;
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, '', "You have no access to this route");
        }
        req.user = decoded;
        next();
    });
};
exports.default = auth;
//# sourceMappingURL=auth.js.map