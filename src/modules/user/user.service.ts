import is from "zod/v4/locales/is.js";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";


const updateUserIntoDB = async (userId:string,payload: IUser) => {
  
const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND,"userError","User Not found.");
  }
 
  const result = await User.findByIdAndUpdate(userId,payload,{new:true});
  return result;
};
const getAllUsersDB = async (query: Record<string,undefined>) => {
  
  const searchableFields = ["name","email","role"];
  const mainQuery = new QueryBuilder(
    User.find({}),
    query
  ).search(searchableFields);
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const paginateQuery = mainQuery.paginate();
  const users = await paginateQuery.modelQuery;
  const result = { data: users, totalPages: totalPages };

  return result;
};
const getSingleUserDB = async (email: string) => {
  const isEmailExists = await User.exists({ email });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND,"userError","User Not found.");
  }
  const result = await User.findOne({ email });
  return result;
};

const updateUserRoleDB = async (userId:string,role:string) => {
  
  const isEmailExists = await User.exists({ _id: userId });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND,"userError","User Not found.");
  }
  const result = await User.findOneAndUpdate({ _id: userId },{role:role},{new:true});
  return result;
};
const updateStatusDB = async (userId:string,isBlocked:string) => {
  
  const isEmailExists = await User.exists({ _id: userId });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND,"userError","User Not found.");
  }
  const result = await User.findOneAndUpdate({ _id: userId },{isBlocked:isBlocked},{new:true});
  return result;
};
export const UserService= {
 
  updateUserIntoDB,
  getAllUsersDB,
  getSingleUserDB,
  
  updateUserRoleDB,
  updateStatusDB
};
