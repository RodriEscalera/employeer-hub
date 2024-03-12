const envList = ["PORT", "CLIENT_HOST"];
export const envs = (() => {
  if (!process.env.PORT || !process.env.CLIENT_HOST) {
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
  } as const;
})();
