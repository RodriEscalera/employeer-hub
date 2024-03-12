import { createTransport } from "nodemailer";
import { google } from "googleapis";
import { APIError } from "../../utils/error.utils";
import { MailOptions } from "../../types/mail.types";

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.OAUTH2_CLIENT_ID,
  process.env.OAUTH2_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

OAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
});

export async function sendEmail({ to, subject, text, html }: MailOptions) {
  try {
    const access = await OAuth2Client.getAccessToken();

    if (!access.token)
      throw new APIError({
        message: "Error while getting access token",
        status: 500,
      });

    const transporter = createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.OAUTH2_EMAIL,
        clientId: process.env.OAUTH2_CLIENT_ID,
        clientSecret: process.env.OAUTH2_CLIENT_SECRET,
        refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
        accessToken: access.token,
      },
    });
    const mailOptions = {
      from: process.env.OAUTH2_EMAIL,
      to,
      subject,
      text,
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new APIError({
      message: `Error while sending email: ${error}`,
      status: 500,
    });
  }
}
