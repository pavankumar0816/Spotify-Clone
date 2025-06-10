import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-gray-300 min-h-screen pl-[4vw]">
      <img
        src={assets.logo}
        className="mt-5 w-[max(10vw, 100px)] hidden sm:block"
        alt=""
      />
      <img
        src={assets.logo_small}
        className="mt-5 w-[max(5vw, 40px)] mr-5 sm:hidden block"
        alt=""
      />

      <div className="flex flex-col gap-5 mt-10">
        <NavLink
          to="/add-song"
          className="flex items-center gap-2.5 text-white bg-gray-800 border border-gray-700 p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_song} className="w-5" alt="" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>

        <NavLink
          to="/display-song"
          className="flex items-center gap-2.5 text-white bg-gray-800 border border-gray-700 p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.song_icon} className="w-5" alt="" />
          <p className="hidden sm:block">View Songs</p>
        </NavLink>

        <NavLink
          to="/add-album"
          className="flex items-center gap-2.5 text-white bg-gray-800 border border-gray-700 p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_album} className="w-5" alt="" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>

        <NavLink
          to="/display-album"
          className="flex items-center gap-2.5 text-white bg-gray-800 border border-gray-700 p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.album_icon} className="w-5" alt="" />
          <p className="hidden sm:block">View Albums</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
