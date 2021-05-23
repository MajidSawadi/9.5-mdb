const User = require("../models/Movie");
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Movie = require("../models/Movie");

const movieController = {};

movieController.create = catchAsync(async (req, res, next) => {});

movieController.list = catchAsync(async (req, res, next) => {
  const movies = await Movie.find({}).limit(20).skip(5);
  sendResponse(res, 200, true, { movies }, null, "movies list");
});

movieController.update = catchAsync(async (req, res, next) => {});

movieController.delete = catchAsync(async (req, res, next) => {});

module.exports = movieController;
