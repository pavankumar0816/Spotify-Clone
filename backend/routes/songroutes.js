const songcontroller = require("../controllers/songcontroller");

const express = require("express");

const upload = require("../middleware/multer");
const songrouter = express.Router();

songrouter.post(
  "/addsong",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  songcontroller.addSong,
);
songrouter.get("/displaysong", songcontroller.listSong);
songrouter.delete("/deletesong/:id", songcontroller.deleteSong);

module.exports = songrouter;
