import blogService from "../services/blog-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      userId: req.params.userId,
      title: req.body.title,
      text: req.body.text,
    };

    await blogService.create(user, request);
    res.status(201).json({
      statusCode: 201,
      data: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const listByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await blogService.listByUserId(userId);
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getDetailblog = async (req, res, next) => {
  try {
    const request = {
      userId: req.params.userId,
      blogId: req.params.blogId,
    };
    const result = await blogService.getDetailblog(request);
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  listByUserId,
  getDetailblog,
};
