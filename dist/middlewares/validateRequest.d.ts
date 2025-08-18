import { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
export declare const validateRequest: (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validateRequest.d.ts.map