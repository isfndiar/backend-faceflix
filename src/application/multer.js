// Library
import multer from "multer";
import path from "path";

// Exception
import { ResponseError } from "../exception/response-error.js";

const profileImage = process.cwd() + "/public/user-profile/profile";
const backgroundImage = process.cwd() + "/public/user-profile/background";
const image = process.cwd() + "/public/post-image";
const video = process.cwd() + "/public/post-video";

const usersStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profileImage") {
      cb(null, profileImage);
    } else if (file.fieldname === "backgroundImage") {
      cb(null, backgroundImage);
    } else if (file.fieldname === "image") {
      cb(null, image);
    } else if (file.fieldname === "video") {
      cb(null, video);
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "profileImage") {
      cb(null, "profile-" + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === "backgroundImage") {
      cb(null, "background-" + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === "image") {
      cb(null, "image-" + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === "video") {
      cb(null, "video-" + Date.now() + path.extname(file.originalname));
    }
  },
});

const userFilter = (req, file, cb) => {
  if (
    file.fieldname === "profileImage" ||
    file.fieldname === "backgroundImage" ||
    file.fieldname === "image"
  ) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new ResponseError(400, "Only JPEG/PNG images are allowed"));
    }
  } else if (file.fieldname === "video") {
    if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/x-matroska" ||
      file.mimetype === "video/x-matroska-3d"
    ) {
      cb(null, true);
    } else {
      cb(new ResponseError(400, "Only MP4/MKV videos are allowed"));
    }
  } else {
    cb(null, true);
  }
};

const userUpload = multer({
  storage: usersStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: userFilter,
});

const videoUpload = multer({
  storage: usersStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: userFilter,
});

export { userUpload, videoUpload };
