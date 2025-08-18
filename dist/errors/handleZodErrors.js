"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleZodErrors = (error) => {
    const errorMessages = error?.issues?.map((issue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message,
        };
    });
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: 'Zod Validation Error',
        errorMessages,
    };
};
exports.default = handleZodErrors;
//# sourceMappingURL=handleZodErrors.js.map