import React from "react";
import { assets } from "../assets/assets";
import {NavLink} from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-[#dde5e7] lg:w-[20%] min-h-screen">

      <div className="pt-8 pb-2 pl-4">
        <img src={assets.logo} className="w-[max(10vw,100px)]  hidden sm:block" alt="Logo"/>
        <img src={assets.logo_small} className="w-[max(5vw,40px)] mr-3 sm:hidden block" alt="Small Logo"/>
      </div>

      <div className="flex flex-col mt-9">
        {/* Creating the route for sidebar : change div to NavLink*/}
        <NavLink to="/add-song" className="flex items-center gap-4 text-gray-800 p-4 pr-[max(8vw,10px)] text-sm font-medium] hover:bg-white">
          <img src={assets.add_song} className="w-5" alt="" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>
        <NavLink to="/list-song" className="flex items-center gap-4 text-gray-800 p-4 pr-[max(8vw,10px)] text-sm font-medium] hover:bg-white">
          <img src={assets.song_icon} className="w-5" alt="" />
          <p className="hidden sm:block">List Song</p>
        </NavLink>
        <NavLink to="/add-album" className="flex items-center gap-4 text-gray-800 p-4 pr-[max(8vw,10px)] text-sm font-medium] hover:bg-white">
          <img src={assets.add_album} className="w-5" alt="" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>
        <NavLink to="/list-album" className="flex items-center gap-4 text-gray-800 p-4 pr-[max(8vw,10px)] text-sm font-medium] hover:bg-white">
          <img src={assets.album_icon} className="w-5" alt="" />
          <p className="hidden sm:block">List Album</p>
        </NavLink>
      </div>

    </div>
  );
};

export default SideBar;
