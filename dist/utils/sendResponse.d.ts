import { Response } from 'express';
type TSendPEsponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
};
declare const sendResponse: <T>(res: Response, data: TSendPEsponse<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map