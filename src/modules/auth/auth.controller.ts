import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginDB, registerDB } from "./auth.service";
import httpStatus from "http-status"

const register = catchAsync(async (req, res) => {
  const result = await registerDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Registration completed successfully.",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await loginDB(req.body);
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: oneWeekMs,
  });
  sendResponse(res, {
    statusCode:httpStatus.OK,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const AuthController = { register, login };
