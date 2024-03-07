import asyncHandler from "../middleware/asyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../model/user.model.js";
import getJWT from "../utils/getJWT.js";

// register controller
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "dummyid",
      url: "profileurl",
    },
  });

  const token = user.getJWTtoken();

  getJWT(user, 201, res);
});

//login controller
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter email and password first", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid password or email", 401));
  }

  const token = user.getJWTtoken();
  getJWT(user, 200, res);
});

//logout user
const logOutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export { registerUser, loginUser, logOutUser };
