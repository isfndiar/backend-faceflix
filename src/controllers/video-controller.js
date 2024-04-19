import videoService from "../services/video-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    if (!req.files["video"]) {
      res.status(400).json({
        errors: "video not send",
      });
    }
    const videoFile = req.files["video"][0];
    console.warn(videoFile);
    const request = {
      userId: req.params.userId,
      title: req.body.title,
      description: req.body.description,
      video: {
        filename: videoFile.filename,
        mimetype: videoFile.mimetype,
        size: videoFile.size,
      },
    };
    await videoService.create(
      user,
      request,
      req.protocol,
      req.host
    );
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
    const result = await videoService.listByUserId(userId);
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getDetailVideo = async (req, res, next) => {
  try {
    const request = {
      userId: req.params.userId,
      videoId: req.params.videoId,
    };

    const result = await videoService.getDetailVideo(request);
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
  getDetailVideo,
};
