import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import type { ZodTypeAny } from "zod";


export const validateRequest = (schema: ZodTypeAny) => {

  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};
