import Joi from "joi";

const create = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().min(1).max(50).required(),
  description: Joi.string().optional(),
  image: Joi.object({
    filename: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
    size: Joi.number()
      .max(2 * 1024 * 1024)
      .required(),
  }),
});

const listByUserId = Joi.string().required();

const getDetailImage = Joi.object({
  userId: Joi.string().required(),
  imageId: Joi.string().required(),
});

export default {
  create,
  listByUserId,
  getDetailImage,
};
