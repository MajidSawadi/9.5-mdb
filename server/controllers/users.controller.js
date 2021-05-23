const User = require("../models/User");
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");

const userController = {};

userController.create = catchAsync(async (req, res, next) => {
  const user = await  new User({ ...req.body })
  await user.save();
  sendResponse(
    res,
    200,
    true,
    { user },
    null,
    "created successfully"
  );
});

userController.list = catchAsync(async (req, res, next) => {});

userController.update = catchAsync(async (req, res, next) => {});

userController.delete = catchAsync(async (req, res, next) => {});

module.exports = userController;
