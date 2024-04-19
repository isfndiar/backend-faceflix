import Joi from "joi";

const create = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().min(1).max(50).required(),
  description: Joi.string().optional(),
  video: Joi.object({
    filename: Joi.string().required(),
    mimetype: Joi.string()
      .valid("video/x-matroska", "video/x-matroska-3d", "video/mp4")
      .required(),
    size: Joi.number()
      .max(5 * 1024 * 1024)
      .required(),
  }),
});

const listByUserId = Joi.string().required();

const getDetailVideo = Joi.object({
  userId: Joi.string().required(),
  videoId: Joi.string().required(),
});

export default {
  create,
  listByUserId,
  getDetailVideo,
};
