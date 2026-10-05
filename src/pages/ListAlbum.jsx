import React, { useState, useEffect } from 'react';

import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const ListAlbum = () => {

  const [data, setData] = useState([]);

  // function to fetch albums from backend
  const fetchAlbums = async () => {
    try {
      const response = await axios.get (`${url}/api/album/list`);
      // if response is successful all data stored in setData state
      if (response.data.success) {
        setData(response.data.albums)
      }

    } catch (error) {
          console.error(
            "Error Ocurred",
            error.response ? error.response.data : error.message
          );
          toast.error(`Error: ${error.response?.data?.message || "Unknown error"}`);
        }
  }

  // REMOVE ALBUM FUNCTION
  // parameter is ID, in the TRT we will call the API
  const removeAlbum = async (id) => {
    try {
      console.log("Deleting album with ID:", id); // Debugging : Checking if ID is Sent Correctly in Frontend

      const response = await axios.delete(`${url}/api/album/delete/${id}`);

      console.log("Delete API Response:", response.data); // Debugging

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums(); // Refresh the song list
      } else {
        toast.error("Failed to delete the album");
      }
    } catch (error) {
      console.error(
        "Delete Album Error:",
        error.response ? error.response.data : error.message
      );
      toast.error(`Error: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  // Execute the function when ever the component gets loaded
  useEffect(() => {
      fetchAlbums(); // Calling the fetch function
    }, []); //adding a dependency array and it would be empty



  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album color</b>
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
              <p>{item.desc}</p>
              <input type="color" value={item.bgColor} />
              <p className="cursor-pointer" onClick={() => {removeAlbum(item._id); {/*It two ways : item.id or item._id, mongoDB uses _id*/} }}>X</p>
            </div>
          ))
        ) : (
          <p>Loading albums...</p> // Fallback to prevent errors
        )}
      </div>
    </div>
  )
}
export default ListAlbum