import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";

// component to list Songs
//First we fetch song from the API and the fetching function will be a state [data, setData]
const ListSong = () => {
  const [data, setData] = useState([]); //

  // in this function we will fetch song from API and store in the state
  // function will be executed when page is reloaded hence we useEffect beneath fetchSongs function
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      console.log("API Response:", response.data); // Debugging

      // If response.data is an object containing an array, extract it correctly, this isnt part of the function its just a control
      setData(
        Array.isArray(response.data) ? response.data : response.data.songs || []
      );
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  // REMOVE SONG FUNCTION
  // parameter is ID, in the TRT we will call the API
  const removeSong = async (id) => {
    try {
      console.log("Deleting song with ID:", id); // Debugging : Checking if ID is Sent Correctly in Frontend

      const response = await axios.delete(`${url}/api/song/delete/${id}`);

      console.log("Delete API Response:", response.data); // Debugging

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs(); // Refresh the song list
      } else {
        toast.error("Failed to delete the song");
      }
    } catch (error) {
      console.error(
        "Delete Song Error:",
        error.response ? error.response.data : error.message
      );
      toast.error(`Error: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  useEffect(() => {
    fetchSongs(); // Calling the fetch function
  }, []); //adding a dependency array and it would be empty

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {/*we will use the data State on this array we use the map method*/}
        {/* If response.data is an object containing an array, extract it correctly, this isnt part of the function its just a control*/}
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img className="w-12" src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p className="cursor-pointer" onClick={() => {removeSong(item._id); {/*It two ways : item.id or item._id, mongoDB uses _id*/} }}>X</p>
            </div>
          ))
        ) : (
          <p>Loading songs...</p> // Fallback to prevent errors
        )}
      </div>
    </div>
  );
};

export default ListSong;