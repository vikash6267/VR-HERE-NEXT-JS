'use client'
import React, { useEffect, useState } from "react";
import Navbar from "./common/Navbar/Navbar";
import Footer from "./common/footer/Footer";
import { allLocations } from "../service/operations/room";
import Loading from "./common/Loading";
import TimeLine from "./core/Timeline";
import Last from "./core/Last";
import Link from "next/link"; // Use next/link for client-side navigation

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [activeTab, setActiveTab] = useState("pg");

  const handleTabName = (tabName) => {
    setActiveTab(tabName);
  };

  const fetchLocations = async () => {
    setLoading(true);
    const response = await allLocations();
    setLocation(response || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);


  return (
    <>
  
        <Navbar />
      <div className="bg-orange-50">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex justify-center my-4">
              <button
                onClick={() => handleTabName("pg")}
                className={`px-4 py-2 text-[16px] ${
                  activeTab === "pg"
                    ? "bg-yellow-600 text-white font-bold"
                    : "bg-gray-200 text-black"
                }`}
              >
                PG/Room
              </button>
              <button
                onClick={() => handleTabName("tifin")}
                className={`px-4 py-2 text-[16px] ${
                  activeTab === "tifin"
                    ? "bg-yellow-600 text-white font-bold"
                    : "text-black bg-gray-200"
                }`}
              >
                Tifin
              </button>
            </div>

            <div className="relative overflow-hidden h-64">
              <div
                className={`transition-transform duration-500 ease-in-out transform ${
                  activeTab === "pg" ? "translate-x-0" : "-translate-x-full"
                } absolute w-full`}
              >
                <div className="flex justify-center">
                  {location.length > 0 ? (
                    <div>
                      {location.map((currElem, index) => (
                        <Link
                          href={`/pg-room/${currElem?._id}`}
                          key={index}
                          className="relative group inline-block m-4 cursor-pointer"
                        >
                          {currElem?.images?.map((image, idx) => (
                            <div key={idx} className="relative ">
                              <img
                                src={image?.url}
                                alt="not found"
                                className="w-20 h-20 md:w-48 md:h-48 rounded-full shadow-yellow-500 shadow-xl"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                                <p className="text-white lg:text-xl text-center">
                                  {currElem?.name}
                                </p>
                              </div>
                            </div>
                          ))}
                          <p className="text-center lg:text-xl mt-4">
                            {currElem?.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p>No Location added yet</p>
                  )}
                </div>
              </div>

              <div
                className={`transition-transform duration-500 ease-in-out transform ${
                  activeTab === "tifin" ? "translate-x-0" : "translate-x-full"
                } absolute w-full`}
              >
                <div className="flex justify-center">
                  {location.length > 0 ? (
                    <>
                      {location.map((currElem, index) => (
                        <Link
                          href={`/tifin-center/${currElem?._id}`}
                          key={index}
                          className="relative group inline-block m-4 cursor-pointer"
                        >
                          {currElem?.images?.map((image, idx) => (
                            <div key={idx} className="relative">
                              <img
                                src={image?.url}
                                alt="not found"
                                className="w-20 h-20 md:w-48 md:h-48 rounded-full shadow-yellow-500 shadow-xl"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                                <p className="text-white lg:text-xl text-center">
                                  {currElem?.name}
                                </p>
                              </div>
                            </div>
                          ))}
                          <p className="text-center mt-4">{currElem?.name}</p>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <p>No Location added yet</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="max-w-7xl mx-auto px-5 mt-10">
          <TimeLine />
        </div>
        <br />
        <div className="max-w-7xl mx-auto px-5 my-16">
          <Last />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
