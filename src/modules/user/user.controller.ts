import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const updateUserInto = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserService.updateUserIntoDB(userId as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated successfully.",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersDB(req.query as Record<string,undefined>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserService.getSingleUserDB(req.params.email as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const { role } = req.query;
  const result = await UserService.updateUserRoleDB(userId as string, role as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated the role.",
    data: result,
  });
});
const updateStatus = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const { isBlocked } = req.query;
  const result = await UserService.updateStatusDB(userId as string, isBlocked as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result?.isBlocked ? "User blocked successfully." : "User unblocked successfully.",
    data: result,
  });
});
export const UserController = {

  updateUserInto,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  updateStatus
};
