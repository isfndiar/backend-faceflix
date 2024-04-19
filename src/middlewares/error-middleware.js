import { MulterError } from "multer";
import { ResponseError } from "../exception/response-error.js";

export const errorMiddleware = async (err, req, res, next) => {
  console.log(err);
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    res.status(err.statusCode).json({
      errors: err.message,
    });
  } else if (err instanceof MulterError) {
    res.status(400).json({
      errors: err.message,
    });
  } else {
    res.status(500).json({
      errors: err.message,
    });
  }
};
