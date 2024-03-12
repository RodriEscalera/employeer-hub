import { Schema, model } from "mongoose";
import { UserModelProps } from "../types/user.types";
import bcrypt from "bcryptjs";

const UserSchema = new Schema<UserModelProps>(
  {
    name: { type: String, required: true },
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

UserSchema.pre<UserModelProps>("save", async function () {
  try {
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
