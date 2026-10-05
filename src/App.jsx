import React from "react";
import { ToastContainer } from "react-toastify"; 
import { Routes, Route } from "react-router-dom";
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

export const url = 'http://localhost:4000';

const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <SideBar/>

      <div className="flex-1 h-screen overflow-hidden bg-[#FFFFFF]">
        <Navbar/>
        <div className="pt-22 h-full overflow-y-auto pl-5 sm:pl-12">
          {/* Wrapping routes inside an error boundary */}
          <ErrorBoundary>
            <Routes>
              <Route path="/add-song" element={<AddSong/>} />
              <Route path="/add-album" element={<AddAlbum/>} />
              <Route path="/list-song" element={<ListSong/>} />
              <Route path="/list-album" element={<ListAlbum/>} />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default App;
