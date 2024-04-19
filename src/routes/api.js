import express from "express";

// Middleware
import { authMiddleware } from "../middlewares/auth-middleware.js";

// Multer
import { userUpload, videoUpload } from "../application/multer.js";

// Controller
import userController from "../controllers/user-controller.js";
import imageController from "../controllers/image-controller.js";
import videoController from "../controllers/video-controller.js";
import blogController from "../controllers/blog-controller.js";

export const api = express.Router();

api.use(authMiddleware);

api.get("/api/users/current", userController.get);
api.patch(
  "/api/users/current/profile",
  userUpload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  userController.update
);

// Image Api
api.post(
  "/api/users/:userId/image",
  userUpload.fields([{ name: "image", maxCount: 1 }]),
  imageController.create
);
api.get("/api/users/:userId/image", imageController.listByUserId);
api.get("/api/users/:userId/image/:imageId", imageController.getDetailImage);

// Video Api
api.post(
  "/api/users/:userId/video",
  videoUpload.fields([{ name: "video", maxCount: 1 }]),
  videoController.create
);
api.get("/api/users/:userId/video", videoController.listByUserId);
api.get("/api/users/:userId/video/:videoId", videoController.getDetailVideo);

// Blog Api
api.post("/api/users/:userId/blog", blogController.create);
api.get("/api/users/:userId/blog", blogController.listByUserId);
api.get("/api/users/:userId/blog/:blogId", blogController.getDetailblog);
