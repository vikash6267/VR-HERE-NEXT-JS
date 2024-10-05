import { AddLeading } from "@/app/service/operations/room";
import React, { useState } from "react";

function EnquiryForm({ roomId, tifinId, isOpen, setModal }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const closeModal = () => {
    setModal(false); // Function to close the modal
  };

  const submit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("number", number);

    if (roomId) {
      formData.append("roomId", roomId);
      formData.append("vendorName", "room");
    } else if (tifinId) {
      formData.append("vendorName", "tifin");
      formData.append("tifinId", tifinId);
    }

    try {
      await AddLeading(formData);
      console.log("Form submitted successfully");
      closeModal(); // Close the modal on successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 relative w-full max-w-md mx-4">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Enquiry Form</h2>
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
              Number
            </label>
            <input
              type="tel"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnquiryForm;
