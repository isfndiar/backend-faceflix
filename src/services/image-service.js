import mongoose from "mongoose";
import fs from "fs/promises";

// Exception
import { ResponseError } from "../exception/response-error.js";

// Model
import ImageModel from "../models/ImageModel.js";
import UserModel from "../models/UserModel.js";

// Validation
import imageValidation from "../validation/image-validation.js";
import { validation } from "../validation/validation.js";

const imageDelete = process.cwd() + "/public/post-image";

const create = async (user, request, protocol, host) => {
  const requestImage = await validation(
    imageValidation.create,
    request,
    async () => {
      await fs.unlink(imageDelete + "/" + request.image.filename);
    }
  );
  if (user.id != requestImage.userId) {
    await fs.unlink(imageDelete + "/" + request.image.filename);
    throw new ResponseError(400, "not create image");
  }
  const userInDatabase = await UserModel.findById(user.id);

  if (!userInDatabase) {
    await fs.unlink(imageDelete + "/" + request.image.filename);
    throw new ResponseError(404, "user not found");
  }

  const data = {
    userId: requestImage.userId,
    title: requestImage.title,
    image:
      protocol +
      "://" +
      host +
      "/public/user/image/" +
      requestImage.image.filename,
  };

  if (requestImage.description) {
    data.description = requestImage.description;
  }

  await ImageModel.create(data);
};

const listByUserId = async (userId) => {
  const requestUserId = await validation(imageValidation.listByUserId, userId);
  const images = await ImageModel.find({ userId: requestUserId });
  let result = images;
  if (images.length >= 1) {
    result = images.map((image) => ({
      id: image.id,
      userId: image.userId,
      title: image.title,
      description: image.description,
      image: image.image,
      createdAt: image.createdAt,
      updatedAt: image.updatedAt,
    }));
  }

  return result;
};

const getDetailImage = async (request) => {
  const imageRequest = await validation(
    imageValidation.getDetailImage,
    request
  );

  if (!mongoose.Types.ObjectId.isValid(imageRequest.imageId)) {
    throw new ResponseError(404, "image not found");
  }

  const imageInDatabase = await ImageModel.findOne({
    _id: imageRequest.imageId,
    userId: imageRequest.userId,
  });

  if (!imageInDatabase) {
    throw new ResponseError(404, "image not found");
  }

  return {
    id: imageInDatabase.id,
    title: imageInDatabase.title,
    description: imageInDatabase.description,
    image: imageInDatabase.image,
    createdAt: imageInDatabase.createdAt,
    updatedAt: imageInDatabase.updatedAt,
  };
};

export default {
  create,
  listByUserId,
  getDetailImage,
};
