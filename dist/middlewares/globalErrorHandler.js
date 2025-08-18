"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodErrors_1 = __importDefault(require("../errors/handleZodErrors"));
const handleValidationErros_1 = __importDefault(require("../errors/handleValidationErros"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const globalErrorHandler = async (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went to wrong';
    let errorMessages = [
        {
            path: '',
            message: 'Something  wrong',
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodErrors_1.default)(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    else if (error?.name === 'ValidationError') {
        const simplifiedError = (0, handleValidationErros_1.default)(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    else if (error?.name === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    else if (error?.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = [
            {
                path: error.path || '',
                message: error?.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorMessages = [
            {
                path: '',
                message: error?.message,
            },
        ];
    }
    return res.status(statusCode).json({
        status: false,
        message,
        errorMessages,
        stack: null,
        // error: error,
    });
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map