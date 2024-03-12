import express, { Express, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import { envs } from "./config/env/env.config";
const { PORT, CLIENT_HOST } = envs;
const app: Express = express();
const options: cors.CorsOptions = {
  origin: [CLIENT_HOST],
};

app.use(morgan("dev"));
app.use(cors(options));
app.use(json());
app.use(urlencoded({ extended: false }));
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
