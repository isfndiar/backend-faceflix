import Joi from "joi";

const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const get = Joi.string().email().required();

const update = Joi.object({
  name: Joi.string().min(4).max(50).optional(),
  title: Joi.string().min(4).max(50).optional(),
  description: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  profileImage: Joi.object({
    filename: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
    size: Joi.number()
      .max(2 * 1024 * 1024)
      .required(), // Batasan ukuran file 2MB
  }).optional(),
  backgroundImage: Joi.object({
    filename: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
    size: Joi.number()
      .max(2 * 1024 * 1024)
      .required(), // Batasan ukuran file 2MB
  }).optional(),
});

export default {
  register,
  login,
  get,
  update,
};
