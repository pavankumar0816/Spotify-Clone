import React, { useState } from "react";
import { assets } from "../assets/assets";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("#121212");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgcolor", colour);

      const response = await axios.post(`${url}/addalbum`, formData);

      if (response.data.success) {
        toast.success("Album Added");
        setDesc("");
        setImage(false);
        setName("");
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      toast.error("Error Occured");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      {loading ? (
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="bg-gray-900 p-8 rounded-2xl shadow-xl flex flex-col gap-8 w-[90vw] max-w-md text-white"
        >
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
                className="w-24 cursor-pointer"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />
            </label>
          </div>

          <div className="flex flex-col gap-2.5">
            <p>Album Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-transparent outline-none border-2 border-gray-600 p-2.5"
              type="text"
              placeholder="Type Here"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <p>Album Description</p>
            <input
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className="bg-transparent outline-none border-2 border-gray-600 p-2.5"
              type="text"
              placeholder="Type Here"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p>Background Colour</p>
            <input
              onChange={(e) => setColour(e.target.value)}
              value={colour}
              type="color"
              className="w-16 h-10 p-1 border border-gray-600"
            />
          </div>

          <button
            className="text-base bg-green-600 hover:bg-green-700 transition text-white py-2.5 px-6 rounded"
            type="submit"
          >
            ADD
          </button>
        </form>
      )}
    </div>
  );
};

export default AddAlbum;
