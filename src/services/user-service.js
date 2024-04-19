// library
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs/promises";

// exception
import { ResponseError } from "../exception/response-error.js";

// validation
import userValidation from "../validation/user-validation.js";
import { validation } from "../validation/validation.js";

//model
import ImageModel from "../models/ImageModel.js";
import VideoModel from "../models/VideoModel.js";
import BlogModel from "../models/BlogModel.js";
import UserModel from "../models/UserModel.js";

dotenv.config();

const profileImageDelete = process.cwd() + '/public/user-profile/profile';
const backgroundImageDelete = process.cwd() + '/public/user-profile/background';

const register = async (request) => {
  const requestUser = await validation(userValidation.register, request);

  const getUserInDatabase = await UserModel.find({ email: requestUser.email });

  if (getUserInDatabase.length != 0) {
    throw new ResponseError(400, "user already exist");
  }

  requestUser.password = await bcrypt.hash(requestUser.password, 10);
  const user = await UserModel.create({
    email: requestUser.email,
    password: requestUser.password,
  });

  return user;
};

const login = async (request) => {
  const userRequest = await validation(userValidation.login, request);
  const user = await UserModel.findOne({ email: userRequest.email });
  if (!user) {
    throw new ResponseError(400, "username or password is wrong");
  }

  const passwordIsValid = await bcrypt.compare(
    userRequest.password,
    user.password
  );

  if (passwordIsValid) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const expire = 60 * 60 * 1;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expire,
    });

    return {
      user: payload,
      token: token,
    };
  } else {
    throw new ResponseError(400, "username or password is wrong");
  }
};

const get = async (email) => {
  const emailRequest = await validation(userValidation.get, email);

  const user = await UserModel.findOne({ email: emailRequest });
  if (!user) {
    throw new ResponseError(404, "user not found");
  }
  const postImage = await ImageModel.find({ userId: user.id });
  const postVideo = await VideoModel.find({ userId: user.id });
  const postBlog = await BlogModel.find({ userId: user.id });

  return {
    id: user.id,
    email: user.email,
    name: user.name || '',
    title: user.title || '',
    profileImage: user.profileImage || '',
    backgroundImage: user.backgroundImage || '',
    description: user.description || '',
    countImage: postImage.length,
    countVideo: postVideo.length,
    countBlog: postBlog.length,
  };
};

const update = async (user, request, protocol, host) => {
  const userRequest = await validation(userValidation.update, request);
  const userCurrent = await UserModel.findById(user.id);
  if (!userCurrent) {
    throw new ResponseError(404, "user not found");
  }
  if (userRequest.profileImage) {
    if (userCurrent.profileImage) {
      const profile = userCurrent.profileImage;
      const file = profile.split("/")[profile.split("/").length - 1];
      await fs.unlink(profileImageDelete + "/" + file);
    }
  }
  if (userRequest.backgroundImage) {
    if (userCurrent.backgroundImage) {
      const background = userCurrent.backgroundImage;
      const file = background.split("/")[background.split("/").length - 1];
      await fs.unlink(backgroundImageDelete + "/" + file);
    }
  }

  const data = {};

  if (userRequest.password) {
    userRequest.password = await bcrypt.hash(userRequest.password, 10);
    data.password = userRequest.password;
  }
  if (userRequest.name) {
    data.name = userRequest.name;
  }
  if (userRequest.title) {
    data.title = userRequest.title;
  }
  if (userRequest.description) {
    data.description = userRequest.description;
  }
  if (userRequest.email) {
    data.email = userRequest.email;
  }
  if (userRequest.profileImage) {
    data.profileImage =
      protocol +
      "://" +
      host +
      "/public/user/profile/" +
      userRequest.profileImage.filename;
  }
  if (userRequest.backgroundImage) {
    data.backgroundImage =
      protocol +
      "://" +
      host +
      "/public/user/background/" +
      userRequest.backgroundImage.filename;
  }  
  await UserModel.updateOne({ _id: user.id }, { $set: data });
};

export default {
  register,
  login,
  get,
  update,
};
