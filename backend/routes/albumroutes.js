const albumcontroller = require("../controllers/albumcontroller");

const express = require("express");
const upload = require("../middleware/multer");

const albumrouter = express.Router();

albumrouter.post("/addalbum", upload.single("image"), albumcontroller.addalbum);
albumrouter.get("/displayalbum", albumcontroller.displayalbum);
albumrouter.delete("/deletealbum/:id", albumcontroller.deletealbum);

module.exports = albumrouter;
