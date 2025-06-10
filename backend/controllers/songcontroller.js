const cloudinary = require("cloudinary").v2;
const SongData = require("../models/Song");

const addSong = async (req, res) => {
  try {
    console.log("Files received:", req.files);

    if (!req.files || !req.files.audio || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, message: "Audio or Image file is missing" });
    }

    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioupload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageupload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const duration = `${Math.floor(audioupload.duration / 60)}:${Math.floor(audioupload.duration % 60)}`;

    const songData = {
      name,
      desc,
      album,
      image: imageupload.secure_url,
      file: audioupload.secure_url,
      duration,
    };

    const song = new SongData(songData);
    await song.save();

    res.json({ success: true, message: "Song Added" });
  } catch (e) {
    console.error(e);
    res.json({ success: false, error: e.message });
  }
};

const listSong = async (req, res) => {
  try {
    const songs = await SongData.find({});
    if (songs.length === 0) {
      res.status(200).json({ succ: false, message: "Data Not Found" });
    } else {
      res.json({ succ: true, songs: songs });
    }
  } catch (e) {
    res.json({ success: false });
  }
};

const deleteSong = async (req, res) => {
  try {
    const deletedSong = await SongData.findByIdAndDelete(req.params.id);

    if (!deletedSong) {
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    }

    res.json({ success: true, message: "Song Removed Successfully..." });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

module.exports = { addSong, listSong, deleteSong };
