import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res
      .status(401)
      .json({
        statusCode: 401,
        errors: "Unauthorized",
      })
      .end();
  }

  const token = authorization.split(" ")[1];
  try {
    const jwtDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = jwtDecode;
  } catch (error) {
    res
      .status(401)
      .json({
        statusCode: 401,
        errors: "Unauthorized",
      })
      .end();
  }
  next();
};
