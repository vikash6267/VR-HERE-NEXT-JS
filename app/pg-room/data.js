'use client'
import React, { useEffect, useState } from "react";
import NavbarContainer from "../component/common/Navbar/Navbar";
import { allRoom, singleLocation } from "../service/operations/room";
import { IoGridSharp, IoListSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import RoomCard from "../component/core/RoomCard";
import Loading from "../component/common/Loading";
import { useParams } from 'next/navigation'

const PGRoom = ({params}) => {
  // const router = useParams<{id:string}>();
const paramss = useParams()

  const { id } = paramss; // Fetch the 'id' parameter from the URL


  const [rooms, setRooms] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    gender: "",
    price: "",
  });
  const [view, setView] = useState("grid");
  const [showFilterPopup, setShowFilterPopup] = useState(false);



  useEffect(() => {

    const findAllRooms = async () => {
      setLoading(true);
      const response = await allRoom();
      console.log(response);
      setRooms(response || []); // Ensure default value if response is undefined
      setLoading(false);
    };
  
    const findLocation = async () => {
      setLoading(true);
      const response = await singleLocation(id);
      console.log(response?.name);
      setLocation(response?.name || "");
      setFilters((prevFilters) => ({
        ...prevFilters,
        location: response?.name || "",
      }));
      setLoading(false);
    };
    findAllRooms();

    if (id) {
      findLocation();
    }
  }, [id,paramss]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      location: "",
      gender: "",
      price: "",
    });
  };

  const filteredRooms = rooms.filter((room) => {
    const matchLocation = filters.location
      ? room?.Location?.some(
          (loc) =>
            loc?.name &&
            loc.name.toLowerCase().includes(filters.location.toLowerCase())
        )
      : true;
    const matchGender = filters.gender
      ? room?.AvailableForBoysOrGirl === filters.gender
      : true;
    const matchPrice = filters.price
      ? room?.price <= parseInt(filters.price)
      : true;
    return matchLocation && matchGender && matchPrice;
  });

  return (
    <div>
      {/* Add the Head component for meta information */}
   
      
      <NavbarContainer />

      <div className="flex flex-col md:flex-row ">
        {/* Filter Panel for Desktop */}
        <div className="hidden  md:block w-full md:w-1/4 p-4 border-r lg:min-h-[calc(100vh-100px)]  bg-yellow-600">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block mb-2 text-[16px] font-semibold">
              Location
            </label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full px-2 text-[16px] py-3 border rounded"
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="Kothri Kalan">Kothri Kalan</option>
              <option value="Ashta">Ashta</option>
              <option value="Sehore">Sehore</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2  text-[16px]  font-semibold">
              Gender
            </label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full px-2 text-[16px] py-3 border rounded"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="boy">Boys</option>
              <option value="girls">Girls</option>
              <option value="boys&girls">Both</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2  text-[16px]  font-semibold">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full px-2 text-[16px] py-3 border rounded"
              placeholder="Max price"
            />
          </div>
          <button
            onClick={handleResetFilters}
            className="w-full px-4 py-2 mt-2 text-xl bg-black text-white rounded"
          >
            Reset Filters
          </button>
        </div>

        {/* Filter Button and View Toggles for Mobile */}
        <div className="md:hidden flex justify-between items-center p-4">
          <button
            onClick={() => setShowFilterPopup(true)}
            className="px-4 py-2 bg-yellow-600 text-white rounded"
          >
            Filters
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => setView("row")}
              className={`p-2 rounded ${
                view === "row" ? "bg-yellow-600 text-white" : "bg-gray-200"
              }`}
            >
              <IoListSharp />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded ${
                view === "grid" ? "bg-yellow-600 text-white" : "bg-gray-200"
              }`}
            >
              <IoGridSharp />
            </button>
          </div>
        </div>

        {/* Filter Popup for Mobile */}
        {showFilterPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded w-3/4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowFilterPopup(false)}
                  className="text-2xl"
                >
                  <IoMdClose />
                </button>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Location</label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  <option value="Kothri Kalan">Kothri Kalan</option>
                  <option value="Ashta">Ashta</option>
                  <option value="Sehore">Sehore</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Gender</label>
                <select
                  name="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="boy">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="boys&girls">Both</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Max price"
                />
              </div>
              <button
                onClick={handleResetFilters}
                className="w-full px-4 py-2 mt-2 bg-black text-white rounded mb-4"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowFilterPopup(false)}
                className="w-full px-4 py-2 bg-yellow-600 text-white rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <div className="w-full md:w-3/4 p-4">
            <h1 className="text-2xl font-bold mb-4">Available Rooms in {location}</h1>
            <div
              className={`grid ${
                view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "grid-cols-1"
              }`}
            >
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))
              ) : (
                <p>No rooms found matching your criteria.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PGRoom;




