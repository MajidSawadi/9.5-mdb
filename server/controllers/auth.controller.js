const User = require("../models/User");
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");

const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({
      success: false,
      error: "Wrong email or password",
    });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({
      success: false,
      error: "Wrong email or password",
    });
  accessToken = await user.generateToken();

  sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "created successfully"
  );
});

module.exports = authController;
