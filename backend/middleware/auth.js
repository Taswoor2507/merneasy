import asyncHandler from "./asyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
const isAuthUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler("Can not access this rosource without logging in ", 401)
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  req.user = await User.findById(decodedData.id);

  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} canot access to this resource`,
          403
        )
      );
    }
    next();
  };
};

export default isAuthUser;
export { authorizeRoles };
