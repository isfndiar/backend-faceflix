import express from "express";
import userController from "../controllers/user-controller.js";

export const apiPublic = express.Router();

apiPublic.post("/api/users/register", userController.register);
apiPublic.post("/api/users/login", userController.login);
