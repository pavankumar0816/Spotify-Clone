import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "./../App";
import { toast } from "react-toastify";

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);

      const response = await axios.post(`${url}/addsong`, formData);
      console.log(response.data);

      if (response.data.success) {
        toast.success("Song Added");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(null);
        setSong(null);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.error("Error Occured");
    }
    setLoading(false);
  };

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/displayalbum`);
      if (response.data.success) {
        setAlbumData(response.data.albumsdata);
      } else {
        toast.error("Unable to Load Albums Data");
      }
    } catch (e) {
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  return loading ? (
    <div className="grid place-items-center min-h-[80vh] bg-black">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-xl flex flex-col items-start gap-8 text-white w-[90vw] max-w-2xl"
      >
        <div className="flex gap-8 flex-wrap">
          <div className="flex flex-col gap-4">
            <p>Upload Song</p>
            <input
              onChange={(e) => setSong(e.target.files[0])}
              type="file"
              id="song"
              accept="audio/*"
              hidden
            />
            <label htmlFor="song">
              <img
                src={song ? assets.upload_added : assets.upload_song}
                className="w-24 cursor-pointer"
                alt=""
              />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              hidden
            />
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                className="w-24 cursor-pointer"
                alt=""
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 w-full">
          <p>Song Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-transparent outline-none border-2 border-gray-600 p-2.5 w-full"
            placeholder="Type Here"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2.5 w-full">
          <p>Song Description</p>
          <input
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="bg-transparent outline-none border-2 border-gray-600 p-2.5 w-full"
            placeholder="Type Here"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <p>Album</p>
          <select
            onChange={(e) => setAlbum(e.target.value)}
            defaultValue={album}
            className="bg-transparent outline-none border-2 border-gray-600 p-2.5 w-[150px] text-white"
          >
            <option value="none">None</option>
            {albumData.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="text-base bg-green-600 hover:bg-green-700 transition text-white py-2.5 px-14 rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddSong;
