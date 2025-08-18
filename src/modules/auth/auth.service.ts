
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import config from "../../config";
import httpStatus from "http-status"


export const registerDB = async (userData: IUser) => {
    const { email } = userData;

    const existingUser = await User.exists({ email });
    if (existingUser) {
        throw new Error("Email is already registered");
    }

    const result = await User.create(userData);
    return result;
};

export const loginDB = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "loginError", "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "loginError", "Invalid credentials");
  }

  const token = jwt.sign(
    { sub: user._id, role: user.role, email: user.email },
    config.jwt_secret!,
    { expiresIn: config.jwt_expries! as any  }
  );

  const safeUser = await User.findById(user._id).select("-password").lean();
  return { token, user: safeUser };
};

export default { registerDB, loginDB };