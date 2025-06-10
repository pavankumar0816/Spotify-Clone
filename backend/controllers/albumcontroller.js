const cloudinary = require("cloudinary").v2;
const AlbumsData = require("../models/Album");

const addalbum = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgcolor = req.body.bgcolor;
    const imageFile = req.file;

    const imageupload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgcolor,
      image: imageupload.secure_url,
    };

    const album = AlbumsData(albumData);
    await album.save();

    res.json({ success: true, message: "Album Added" });
  } catch (e) {
    res.json({ sucess: false });
  }
};

const displayalbum = async (req, res) => {
  try {
    const albums = await AlbumsData.find();
    if (albums.length == 0) {
      response.status(200).send("Data Not Found");
    } else {
      res.json({ success: true, albumsdata: albums });
    }
  } catch (e) {
    res.json({ success: false });
  }
};

const deletealbum = async (req, res) => {
  try {
    await AlbumsData.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Album Deleted Successfully" });
  } catch (e) {
    res.json({ success: false });
  }
};

module.exports = { addalbum, displayalbum, deletealbum };
