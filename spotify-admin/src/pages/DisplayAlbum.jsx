import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../App";

const DisplayAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/displayalbum`);

      if (response.data.success) {
        setData(response.data.albumsdata);
      }
    } catch (e) {
      toast.error("Error Occured");
      console.log(e);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      const response = await axios.delete(`${url}/deletealbum/${id}`);

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }
    } catch (e) {
      console.log(e);
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All Albums</p>
      <br />
      <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Album Colour</b>
        <b>Action</b>
      </div>

      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
          >
            <img className="w-12" src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input
              type="color"
              value={item.bgcolor}
              onChange={(e) => {
                const newData = [...data];
                newData[index].bgcolor = e.target.value;
                setData(newData);
              }}
            />

            <button
              onClick={() => deleteAlbum(item._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayAlbum;
