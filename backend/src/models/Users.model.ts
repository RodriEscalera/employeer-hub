import { Schema, model } from "mongoose";
import { UserModelProps } from "../types/user.types";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { APIError } from "../utils/error.utils";

const UserSchema = new Schema<UserModelProps>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String },
    is_admin: { type: Boolean, default: false },
    phone: {
      type: Number,
      required: true,
    },
    dni: {
      type: Number,
      required: true,
    },
    resetToken: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.hashPassword = async function (
  password: string,
  salt: string
) {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

UserSchema.methods.validatePassword = async function (password: string) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.generateResetPasswordCode = async function () {
  const code = crypto.randomInt(100000, 1000000).toString();
  const hashedCode = await this.hashPassword(code, this.salt);
  this.resetToken = hashedCode;
  await this.save();
  return code;
};

UserSchema.methods.resetPassword = async function (
  code: string,
  newPassword: string
) {
  if (code.length !== 6)
    throw new APIError({ status: 400, message: "Invalid code" });

  const isMatch = await bcrypt.compare(code, this.resetToken);

  if (!isMatch) {
    throw new APIError({
      status: 400,
      message: "Invalid code",
    });
  }

  const hashedPassword = await this.hashPassword(newPassword, this.salt);

  this.password = hashedPassword;
  this.resetToken = undefined;

  await this.save();
};

UserSchema.pre<UserModelProps>("save", async function () {
  try {
    if (!this.isNew) return;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(this.password, salt);

    this.salt = salt;
    this.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }
});

const User = model<UserModelProps>("Users", UserSchema);
export { User };
