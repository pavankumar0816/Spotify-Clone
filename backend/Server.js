const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const dburl = process.env.MONGODB_URI;
mongoose
  .connect(dburl)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const connectCloudinary = require("./config/cloudinary");
connectCloudinary();

// using this middleware whenever we get a request, that request will pass using this json method...
// using cors method we can allow the frontend to connect with backend
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON data

app.get("/", (req, res) => res.send("Spotify-Clone is Running"));

const songrouter = require("./routes/songroutes");
const albumrouter = require("./routes/albumroutes");

app.use("", songrouter);
app.use("", albumrouter);

const port = process.env.PORT || 2025;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
