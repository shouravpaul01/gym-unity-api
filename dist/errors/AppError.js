"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//The default Error method cannot handle status codes. Therefore, I created a superclass named 'AppError' to handle status codes along with error messages.
class AppError extends Error {
    statusCode;
    path;
    isAppError;
    constructor(statusCode, path, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.path = path;
        this.isAppError = true;
        if (!stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
//# sourceMappingURL=AppError.js.map