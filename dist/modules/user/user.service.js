"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const updateUserIntoDB = async (userId, payload) => {
    const isUserExists = await user_model_1.User.findById(userId);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "userError", "User Not found.");
    }
    const result = await user_model_1.User.findByIdAndUpdate(userId, payload, { new: true });
    return result;
};
const getAllUsersDB = async (query) => {
    const searchableFields = ["name", "email", "role"];
    const mainQuery = new QueryBuilder_1.QueryBuilder(user_model_1.User.find({}), query).search(searchableFields);
    const totalPages = (await mainQuery.totalPages()).totalQuery;
    const paginateQuery = mainQuery.paginate();
    const users = await paginateQuery.modelQuery;
    const result = { data: users, totalPages: totalPages };
    return result;
};
const getSingleUserDB = async (email) => {
    const isEmailExists = await user_model_1.User.exists({ email });
    if (!isEmailExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "userError", "User Not found.");
    }
    const result = await user_model_1.User.findOne({ email });
    return result;
};
const updateUserRoleDB = async (userId, role) => {
    const isEmailExists = await user_model_1.User.exists({ _id: userId });
    if (!isEmailExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "userError", "User Not found.");
    }
    const result = await user_model_1.User.findOneAndUpdate({ _id: userId }, { role: role }, { new: true });
    return result;
};
const updateStatusDB = async (userId, isBlocked) => {
    const isEmailExists = await user_model_1.User.exists({ _id: userId });
    if (!isEmailExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "userError", "User Not found.");
    }
    const result = await user_model_1.User.findOneAndUpdate({ _id: userId }, { isBlocked: isBlocked }, { new: true });
    return result;
};
exports.UserService = {
    updateUserIntoDB,
    getAllUsersDB,
    getSingleUserDB,
    updateUserRoleDB,
    updateStatusDB
};
//# sourceMappingURL=user.service.js.map