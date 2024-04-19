// Library
import express from "express";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Middleware
import cors from "cors";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import swaggerUi from "swagger-ui-express";

// Route
import { apiPublic } from "../routes/api-public.js";
import { api } from "../routes/api.js";

// Database
import { connectDatabase } from "./database.js";
connectDatabase();

const rawSwaggerDocument = fs.readFileSync(
  process.cwd() + "/faceflixApiSpec.json"
);
const swaggerDocument = JSON.parse(rawSwaggerDocument);

export const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  "/public/user/profile",
  express.static("./public/user-profile/profile/")
);
app.use(
  "/public/user/background/",
  express.static("./public/user-profile/background")
);
app.use("/public/user/image/", express.static("./public/post-image"));
app.use("/public/user/video/", express.static("./public/post-video"));
app.get("/", (req, res) => {
  res.send("Express JS on Vercel");
});
app.use(apiPublic);
app.use(api);

app.use(errorMiddleware);
