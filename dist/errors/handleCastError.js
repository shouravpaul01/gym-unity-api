"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleCastError = (error) => {
    const errorMessages = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: 'Cast Error',
        errorMessages,
    };
};
exports.default = handleCastError;
//# sourceMappingURL=handleCastError.js.map