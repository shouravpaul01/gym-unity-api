import { NextFunction, Request, Response } from "express";
import { IUserRole } from "../modules/user/user.interface";
declare const auth: (...requiredRoles: IUserRole[]) => (req: Request, res: Response, next: NextFunction) => void;
export default auth;
//# sourceMappingURL=auth.d.ts.map