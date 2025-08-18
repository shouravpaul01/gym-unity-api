"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleValidationErrors = (error) => {
    const errorMessages = Object.values(error.errors).map((value) => {
        return {
            path: value.path,
            message: value.message,
        };
    });
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: 'Mongoose Validation Error',
        errorMessages,
    };
};
exports.default = handleValidationErrors;
//# sourceMappingURL=handleValidationErros.js.map