"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDB = exports.registerDB = void 0;
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../../config"));
const http_status_1 = __importDefault(require("http-status"));
const registerDB = async (userData) => {
    const { email } = userData;
    const existingUser = await user_model_1.User.exists({ email });
    if (existingUser) {
        throw new Error("Email is already registered");
    }
    const result = await user_model_1.User.create(userData);
    return result;
};
exports.registerDB = registerDB;
const loginDB = async (payload) => {
    const { email, password } = payload;
    const user = await user_model_1.User.findOne({ email }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "loginError", "Invalid credentials");
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "loginError", "Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({ sub: user._id, name: user.name, role: user.role, email: user.email }, config_1.default.jwt_secret, { expiresIn: config_1.default.jwt_expries });
    const safeUser = await user_model_1.User.findById(user._id).select("-password").lean();
    return { token, user: safeUser };
};
exports.loginDB = loginDB;
exports.default = { registerDB: exports.registerDB, loginDB: exports.loginDB };
//# sourceMappingURL=auth.service.js.map