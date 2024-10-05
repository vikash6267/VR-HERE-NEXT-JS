'use client'
import React, { useEffect, useState } from "react";
import NavbarContainer from "../component/common/Navbar/Navbar";
import { allTifins } from "../service/operations/tifin";
import { singleLocation } from "../service/operations/room";
import { IoGridSharp, IoListSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import TifinCard from "../component/core/TifinCard";
// import { useParams } from "react-router-dom";
import Loading from "../component/common/Loading";

const Tifin = ({ params }) => {
  const  id  = params;

  const [tifins, setTifins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    mealType: "",
    price: "",
  });
  const [view, setView] = useState("grid");
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const findAllTifins = async () => {
    setLoading(true);
    const response = await allTifins();
    console.log(response);
    setTifins(response || []);
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

  useEffect(() => {
    findAllTifins();
    if (id) {
      findLocation();
    }
  }, [id]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      location: "",
      mealType: "",
      price: "",
    });
    setLocation(""); // Reset location to empty string
  };

  const filteredTifins = tifins.filter((tifin) => {
    const matchLocation = filters.location
      ? tifin?.Location?.some(
          (loc) =>
            loc?.name &&
            loc.name.toLowerCase().includes(filters.location.toLowerCase())
        )
      : true;

    const matchMealType = filters.mealType
      ? tifin?.type === filters.mealType
      : true;

    const matchPrice = filters.price
      ? tifin?.price <= parseInt(filters.price)
      : true;

    return matchLocation && matchMealType && matchPrice;
  });

  return (
    <div>
      <NavbarContainer />

      <div className="flex flex-col md:flex-row">
        {/* Filter Panel for Desktop */}
        <div className="hidden md:block w-full md:w-1/4 p-4 border-r lg:min-h-[calc(100vh-100px)] bg-yellow-600 ">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block mb-2 text-[16px] font-semibold">
              Location
            </label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full px-2 py-3 text-[16px] cursor-pointer border rounded"
            >
              <option disabled value="">
                Select Location
              </option>
              <option value="Kothri Kalan">Kothri Kalan</option>
              <option value="Ashta">Ashta</option>
              <option value="Sehore">Sehore</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-[16px] font-semibold">
              Meal Type
            </label>
            <select
              name="mealType"
              value={filters.mealType}
              onChange={handleFilterChange}
              className="w-full px-2 border rounded text-[16px] py-3 cursor-pointer"
            >
              <option disabled value="">
                Select Meal Type
              </option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
              <option value="veg&nonveg">Both</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-[16px] font-semibold">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full px-2 py-3 cursor-pointer text-[16px] border rounded"
              placeholder="Max price"
            />
          </div>
          <button
            onClick={handleResetFilters}
            className="w-full px-4 text-sm  lg:text-xl py-2 mt-2 bg-black text-white rounded"
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
                  <option disabled value="">
                    Select Location
                  </option>
                  <option value="Kothri Kalan">Kothri Kalan</option>
                  <option value="Ashta">Ashta</option>
                  <option value="Sehore">Sehore</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Meal Type</label>
                <select
                  name="mealType"
                  value={filters.mealType}
                  onChange={handleFilterChange}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="" disabled>
                    Select Meal Type
                  </option>
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                  <option value="veg&nonveg">Both</option>
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
            <div className="hidden md:flex justify-end mb-4">
              <button
                onClick={() => setView("row")}
                className={`mr-2 p-2 rounded ${
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
            {filteredTifins.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "flex flex-col"
                }
              >
                {filteredTifins.map((tifin, index) => (
                  <TifinCard key={index} tifin={tifin} view={view} />
                ))}
              </div>
            ) : (
              <div>
                <p>No Tifin found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tifin;
