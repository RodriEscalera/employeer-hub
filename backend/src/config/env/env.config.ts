const envList = [
  "PORT",
  "CLIENT_HOST",
  "MONGO_DB_NAME",
  "MONGO_PORT",
  "JWT_SECRET",
  "OAUTH2_CLIENT_ID",
  "OAUTH2_CLIENT_SECRET",
  "OAUTH2_REFRESH_TOKEN",
  "OAUTH2_EMAIL",
  "MONGO_URI",
];
export const envs = (() => {
  if (
    !process.env.PORT ||
    !process.env.CLIENT_HOST ||
    !process.env.MONGO_DB_NAME ||
    !process.env.MONGO_PORT ||
    !process.env.JWT_SECRET ||
    !process.env.OAUTH2_CLIENT_ID ||
    !process.env.OAUTH2_CLIENT_SECRET ||
    !process.env.OAUTH2_REFRESH_TOKEN ||
    !process.env.OAUTH2_EMAIL ||
    !process.env.MONGO_URI
  ) {
    const missingEnvs: string[] = [];

    envList.forEach((element) => {
      if (!process.env[element]) missingEnvs.push(element);
    });
    throw new Error(
      `The project must contains all the envs. The missing envs are: ${missingEnvs.join(
        ", "
      )}.`
    );
  }
})();
