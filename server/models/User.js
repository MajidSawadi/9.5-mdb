const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const saltRounds = 10;
const userSchema = Schema(
  {
    name: { type: String, required: false, unique: false, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, unique: false },
    avatarUrl: { type: String, required: false, default: "" },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const loginRequired = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString)
      return res.status(401).json({
        success: false,

        error: "Token not found",
      });

    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,

            error: "Token expired.",
          });
        } else {
          return res.status(401).json({
            success: false,

            error: "Token is invalid",
          });
        }
      }
      req.userId = payload.id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = { loginRequired };
const User = mongoose.model("User", userSchema);
module.exports = User;
