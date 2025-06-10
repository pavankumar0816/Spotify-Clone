import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import DisplayAlbum from "./pages/DisplayAlbum";
import DisplaySong from "./pages/DisplaySong";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

export const url = "http://localhost:2025";

const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <SideBar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <NavBar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/display-album" element={<DisplayAlbum />} />
            <Route path="/display-song" element={<DisplaySong />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
