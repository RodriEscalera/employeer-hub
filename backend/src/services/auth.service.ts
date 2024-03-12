import { generateToken, validateToken } from "../config/jwt/token";
import { sendEmail } from "../config/mailer/mailer.config";
import { User } from "../models/Users.model";
import {
  LoginRequestBody,
  RegisterRequestBody,
  ResetPasswordRequest,
} from "../types/user.types";
import { APIError } from "../utils/error.utils";

class AuthService {
  static async register(userBody: RegisterRequestBody) {
    const newUser = await new User(userBody).save();
    if (!newUser) {
      throw new APIError({
        message: "Error with creating a User",
        status: 500,
      });
    }
    return { user: newUser };
  }

  static async login(userBody: LoginRequestBody) {
    const foundUser = await User.findOne({ email: userBody.email });

    if (!foundUser) {
      throw new APIError({
        message: "User does not exist",
        status: 404,
      });
    }

    const isValid = await foundUser.validatePassword(userBody.password);
    if (!isValid) {
      throw new APIError({
        message: "Password does not match",
        status: 404,
      });
    }

    const token = generateToken({
      _id: foundUser._id,
      is_admin: foundUser.is_admin,
    });

    const { password, salt, resetToken, ...userData } = foundUser.toObject();

    return { user: userData, token };
  }

  static async generateUpdatePasswordToken(userEmail: string) {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new APIError({ message: "User does not exist", status: 404 });
    }
    const code = await user.generateResetPasswordCode();
    const token = generateToken(
      { _id: user._id, is_admin: user.is_admin },
      "1h"
    );
    const clientLink = `${process.env.CLIENT_HOST}/auth/reset-password?token=${token}`;
    await sendEmail({
      to: user.email,
      subject:
        "Restablecimiento de contraseña: Siga este enlace para cambiar su contraseña.",
      html: `<h1>Restablecer contraseña</h1>
  <p>Tu código para restablecer contraseña es: ${code}</p>
  <p>Haz click <a href="${clientLink}">aquí<a/> para restablecer tu contraseña</p>
  `,
    });
  }

  static async resetPassword(resetPasswordRequest: ResetPasswordRequest) {
    const { token, code, newPassword } = resetPasswordRequest;
    const tokenData = validateToken(token);
    const user = await User.findOne({ _id: tokenData.user._id }).exec();

    if (!user) {
      throw new APIError({ message: "User was not found", status: 404 });
    }

    await user.resetPassword(code.toString(), newPassword);

    await sendEmail({
      to: user.email,
      subject: "Contraseña restablecida correctamente",
      html: `<h1>Contraseña restablecida correctamente</h1>
      <p>Tu contraseña ha sido restablecida con éxito</p>`,
    });
  }

  static async me(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new APIError({ message: "User was not found", status: 404 });
    }

    const payload = {
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      is_admin: user.is_admin,
      phone: user.phone,
      dni: user.dni,
    };
    return payload;
  }
}

export { AuthService };
