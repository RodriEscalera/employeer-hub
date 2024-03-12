import { Schema, model } from "mongoose";
import { UserMainProps } from "./User.model.types";

const UserSchema = new Schema<UserMainProps>(
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
const User = model<UserMainProps>("Users", UserSchema);
export { User };
