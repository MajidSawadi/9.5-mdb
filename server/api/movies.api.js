const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movies.controller");

router.get("/", movieController.list);
router.post("/", movieController.create);
router.patch("/:id", movieController.update);
router.delete("/:id", movieController.delete);

module.exports = router;
