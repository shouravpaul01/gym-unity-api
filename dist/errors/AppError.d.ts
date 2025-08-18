declare class AppError extends Error {
    statusCode: number;
    path?: string;
    isAppError: boolean;
    constructor(statusCode: number, path: string, message?: string, stack?: string);
}
export default AppError;
//# sourceMappingURL=AppError.d.ts.map