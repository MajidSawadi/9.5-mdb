const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = Schema(
  {
    id: { type: String, required: true, unique: false, default: "" },
  },

  {
    title: { type: String, required: true, unique: false, default: "" },
  },
  {
    genre: { type: String, required: true, unique: false, default: "" },
  },

  {
    country: { type: String, required: true, unique: false, default: "" },
  },

  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
