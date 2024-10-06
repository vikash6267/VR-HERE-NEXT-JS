import React, { useState } from "react";
import RoomEditModal from "./RoomEditModal ";
import Image from "next/image";

const DisplayRoom = ({ room, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (updatedRoom) => {
    // Here you can make API call to save the updated room details
    // For example: await updateRoom(updatedRoom, token);
    onUpdate(updatedRoom); // Update parent component or global state
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
        <div className="flex-shrink-0">
          <Image   
          width={500}
           height={600}
            src={room?.images?.[0]?.url}
            alt="Room"
            className="w-full md:w-64 h-48 object-cover rounded-lg mb-4 md:mb-0"
          />
        </div>
        <div className="md:ml-6">
          <h1 className="text-2xl font-bold mb-2">
            {room?.pgName || "No Name Available"}
          </h1>
          <p className="text-gray-600 mb-4">
            {room?.desc || "No Description Available"}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
              {room?.AvailableForBoysOrGirl === "boy"
                ? "For Boys"
                : "For Girls"}
            </span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
              {room?.vegNonveg === "veg" ? "Veg Only" : "Non-Veg Allowed"}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <span className="material-icons mr-2">Rent</span>
              <span className="font-semibold">
                {room?.price || "No Price Available"} INR
              </span>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-2">Available Rooms</span>
              <span>
                {room?.totalRoom || "No Room Information Available"} Rooms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Room Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {room?.images?.map((image, index) => (
            <Image   width={500} height={600}
              key={index}
              src={image?.url}
              alt={`Room image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-md min-h-[300px]"
            />
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Facilities:</h3>
          <ul className="list-disc list-inside">
            {room?.foodAvailable === "true" && <li>Food Available</li>}
            {room?.ac === "true" && <li>AC</li>}
            {room?.parking === "true" && <li>Parking</li>}
            {room?.waterCharges && <li>Water Charges: {room?.waterCharges} INR</li>}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Timings:</h3>
          <p className="text-gray-700">Closing Time: {room?.closingTime || "Not Available"}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Edit Room Details
        </button>
      </div>

      <RoomEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={room}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default DisplayRoom;
