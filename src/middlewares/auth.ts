import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";

import { IUserRole } from "../modules/user/user.interface";

import AppError from "../errors/AppError";
import verifyToken from "../utils/verifyToken";

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
   
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED,'', "You are not authorized!");
    }
    // checking if the given token is valid
    const decoded=  verifyToken(token,"You are not authorized!")

  
    const { role } = decoded;
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,'',
        "You have no access to this route"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
