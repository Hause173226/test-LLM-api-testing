import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import apiRoutes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { ApiError } from "./utils/ApiError";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api-docs/swagger.json", (_req, res) => {
  res.json(swaggerDocument);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    explorer: true,
    swaggerUrl: "/api-docs/swagger.json",
  }),
);
app.use("/api", apiRoutes);

app.use((_req, _res, next) => {
  next(new ApiError(404, "Route not found"));
});

app.use(errorHandler);

export default app;
