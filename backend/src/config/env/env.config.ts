const envList = [
  "PORT",
  "CLIENT_HOST",
  "MONGO_DB_NAME",
  "MONGO_PORT",
  "JWT_SECRET",
];
export const envs = (() => {
  if (
    !process.env.PORT ||
    !process.env.CLIENT_HOST ||
    process.env.MONGO_DB_NAME ||
    process.env.MONGO_PORT ||
    process.env.JWT_SECRET
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
  return {
    PORT: process.env.PORT,
    CLIENT_HOST: process.env.CLIENT_HOST,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MONGO_PORT: process.env.MONGO_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
  } as const;
})();
