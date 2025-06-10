import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "./../App";
import { toast } from "react-toastify";

const DisplaySong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/displaysong`);
      console.log(response.data);

      if (response.data.succ) {
        setData(response.data.songs);
      }
    } catch (e) {
      console.log(e);
      toast.error("Error Occurred");
    }
  };

  const deleteSong = async (id) => {
    try {
      const response = await axios.delete(`${url}/deletesong/${id}`);

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p className="text-xl font-bold mb-2">All Songs</p>

      <div className="border border-gray-300 rounded-md overflow-hidden">
        <div className="grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] bg-gray-100 text-sm font-semibold p-3 border-b">
          <p>Image</p>
          <p>Name</p>
          <p>Album</p>
          <p>Duration</p>
          <p>Action</p>
        </div>

        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center p-3 border-b text-sm"
            >
              <img
                className="w-12 h-12 object-cover rounded-md"
                src={item.image}
                alt="Album Art"
              />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <button
                onClick={() => deleteSong(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                x
              </button>
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-gray-500">
            No Songs Available
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplaySong;
