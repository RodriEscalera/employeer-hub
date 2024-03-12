import express, {
  Express,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import morgan from "morgan";
import cors from "cors";
import syncDB from "./config/db";
import { envs } from "./config/env/env.config";
import { allRoutes } from "./routes";
import { APIError } from "./utils/error.utils";

const { PORT, CLIENT_HOST } = envs;
const app: Express = express();
const options: cors.CorsOptions = {
  origin: [CLIENT_HOST],
};

app.use(morgan("dev"));
app.use(cors(options));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/api", allRoutes);
app.use(
  (
    error: APIError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    console.error(error);
    res.status(error.status || 500).send({
      status: error.status || 500,
      message: error.message,
      data: null,
    });
  }
);

(async () => {
  await syncDB();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}`);
  });
})();
