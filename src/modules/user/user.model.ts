import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true,select:0 },
      role: {
        type: String,
        enum: ["admin", "trainer", "trainee"],
        default:"trainee"
      },
      profile: {
        age: Number,
        phone: String,
        address: String,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      }
    },
    { timestamps: true }
  );
  
  // Hash password before saving 
  UserSchema.pre("save", async function (next) {
    const user = this as any;
    if (!user.isModified("password")) return next();
    const saltRounds = Number(config.bcrypt_salt_rounds) || 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    next();
  });

  
  
  export const User =model<IUser>("User", UserSchema);