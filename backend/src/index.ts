import express, { Express, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import syncDB from "./config/db";
import { envs } from "./config/env/env.config";
import { User } from "./models/Users/Users.model";

const { PORT, CLIENT_HOST } = envs;
const app: Express = express();
const options: cors.CorsOptions = {
  origin: [CLIENT_HOST],
};

console.log(User);

app.use(morgan("dev"));
app.use(cors(options));
app.use(json());
app.use(urlencoded({ extended: false }));

(async () => {
  await syncDB();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}`);
  });
})();
