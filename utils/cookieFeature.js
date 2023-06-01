import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    })
    .json({
      success: true,
      message,
    });
};

export const DeleteCookie = (user, res, statusCode, message) => {
  const token = jwt.verify({ _id: user._id }, process.env.JWT_SECRET_KEY);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message,
    });
};
