import Joi from "joi";

const create = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().min(1).max(50).required(),
  text: Joi.string().min(1).required(),
});

const listByUserId = Joi.string().required();

const getDetailblog = Joi.object({
  userId: Joi.string().required(),
  blogId: Joi.string().required(),
});

export default {
  create,
  listByUserId,
  getDetailblog,
};
