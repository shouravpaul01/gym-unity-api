"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const verifyToken = (token, customErrorMessage) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        return decoded;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "", customErrorMessage);
    }
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map