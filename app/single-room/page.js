'use client'
import React, { useEffect, useState } from "react";
import NavbarContainer from "../component/common/Navbar/Navbar";
import { useParams } from "next/navigation";


import { FaKitchenSet, FaRegMoneyBill1 } from "react-icons/fa6";
import { GiStabbedNote } from "react-icons/gi";
import { IoTime } from "react-icons/io5";
import {
  FaUser,
  FaSmoking,
  FaWineGlassAlt,
  FaHome,
  FaPhone,
} from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { ImPower } from "react-icons/im";
import { RxCross2, RxCheck } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import {
  FaWifi,
  FaBatteryFull,
  FaBroom,
  FaWater,
  FaUserShield,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import { checkRating, roomAverageRating } from "../service/operations/user";
import LoginModal from "../component/common/LoginModal";
import ReviewDetails from "../component/core/Review Rating/ReviewDetails";
import Loading from "../component/common/Loading";

import EnquiryForm from "../component/room/EnquiryForm";
import RoomSlider from "../component/core/RoomSlider";
import CourseReviewModal from "../component/core/Review Rating/ReviewRating";
import PhoneModal from "../component/common/PhoneModal";
import { singleRoom } from "../service/operations/room";
import Image from "next/image";



const SingleRoom = () => {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("rules");
  const [ratingAverage, setAverage] = useState(0);
  const { token, user } = useSelector((state) => state.auth);
  const [reviewModal, setReviewModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [alreadyRating, setAlreadyRating] = useState(false);
  const [ratingData, setUserData] = useState({});

  const [enquiryForm, setQnquiryForm] = useState(false);

  const openModal = () => setQnquiryForm(true);
  const closeModal = () => setQnquiryForm(false);

  const reviewAdd = () => {
    if (token) {
      setReviewModal(true);
      return;
    }
    setLoginModal(true);
  };

  const fetchSingleRoom = async () => {
    try {
      setLoading(true);
      const response = await singleRoom(slug);

      setRoom(response);
      // console.log(response.ratingAndReviews      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching single room:", error);
      setLoading(false);
    }
  };

  const fetchAerageRating = async () => {
    try {
      const response = await roomAverageRating({ roomId: room?._id }, token);
      // console.log(response);
      setAverage(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRatingStaus = async () => {
    try {
      const response = await checkRating({ roomId: room?._id }, token);
      console.log(response);
      setAlreadyRating(response);
      setUserData(response?.alreadyReviewed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchSingleRoom();
    }
    // console.log(slug);
  }, [slug,fetchSingleRoom,]);

  useEffect(() => {
    if (room) {
      fetchAerageRating();
      if (token) {
        fetchRatingStaus();
      }
    }
  }, [room,fetchAerageRating,fetchRatingStaus]);



  if (loading) {
    return (
      <>
        <NavbarContainer />

        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "rules":
        return (
          <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 ">
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <GiStabbedNote size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Notice Period</span>
              <p>{room?.noticePeriod} Days</p>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white ">
              <IoTime size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Gate Closing Time</span>
              <p>{room?.closingTime}</p>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white ">
              <FaKitchenSet size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Non-Veg</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.vegNonveg === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <BiMaleFemale size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Opposite Gender</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.oppositeGender === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaSmoking size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Smoking</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.smocking === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaWineGlassAlt size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Drinking</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.drinking === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaUser size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Visitor Entry</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.visitorEntry === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
          </div>
        );
      case "amenities":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaWifi size={40} className="text-yellow-500 mb-3" />

              <span className="font-bold">Wifi</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.wifi === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaBatteryFull size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Power Backup</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.pBackup === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaBroom size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Room Service</span>
              <p>{room?.maintenance}/- INR</p>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaWater size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Water Cooler</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.water === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaUserShield size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Warden</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.wordan === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
          </div>
        );
      case "charges":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaHome size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Maintenance</span>
              <p>₹ {room?.maintenance}</p>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <ImPower size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Water Charges</span>
              {/* <div className=" flex justify-center w-[40%]">  {room?.pBackup ==="true"  ? <RxCheck className=" bg-green-600 text-white rounded-full" /> :  <RxCross2 className="bg-red-600 text-white rounded-full " /> }</div> */}

              <p>₹ {room?.waterCharges}</p>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaRegMoneyBill1 size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Deposit Amount</span>
              <p>₹ {room?.depositeAmount}</p>
            </div>
            <div className="border p-5 flex flex-col items-center text-center bg-white">
              <FaWater size={40} className="text-yellow-500 mb-3" />
              <span className="font-bold">Laundry</span>
              <div className=" flex justify-center w-[40%]">
                {" "}
                {room?.Laundry === "true" ? (
                  <RxCheck className=" bg-green-600 text-white rounded-full" />
                ) : (
                  <RxCross2 className="bg-red-600 text-white rounded-full " />
                )}
              </div>
            </div>
          </div>
        );
      default:
        return <p>Select a tab to view details</p>;
    }
  };

  return (
    <div>
 
      <NavbarContainer />
      {loading ? (
        <Loading />
      ) : room ? (
        <div>
          {/* <div className="bg-slate-400 p-5">
            <div className="main text-xl max-w-7xl mx-auto flex lg:justify-between lg:items-center lg:flex-row flex-col gap-8">
              <div className="flex">
                <p className="grid">
                  <span>Rent</span>
                  <span>{room.price}</span>
                </p>
                <div className="border-r-2 h-16 mx-3"></div>
                <p className="grid">
                  <span>{room.pgName}</span>
                  <span>{room?.Location[0]?.name}</span>
                </p>
              </div>
              <div>
                {token ? (
                  <button className="px-5 py-2 bg-transparent rounded-full border-2 text-red-600 hover:border-red-600 hover:text-white">
                    {room?.vendor?.contact}
                  </button>
                ) : (
                  <button
                    className="px-5 py-2 bg-transparent rounded-full border-2 text-red-600 hover:border-red-600 hover:text-white"
                    onClick={() => setPhoneModal(true)}
                  >
                    Phone No
                  </button>
                )}
              </div>
            </div>
          </div> */}

          <div className="main grid grid-cols-1 lg:grid-cols-2 gap-5 my-10 px-5">
            <div>
              <RoomSlider images={room?.images} />
            </div>

            <div>
              <div className="px-5">
                <p className="lg:text-4xl md:text-3xl text-2xl ">
                  {room?.pgName}
                </p>
                <p className="lg:text-2xl md:text-2xl text-xl my-4 ">
                  <span>
                    Location: <span>{room?.Location[0]?.name}</span>
                  </span>
                </p>
                <p className="lg:text-2xl md:text-2xl text-xl my-4 ">
                  <span>
                    Rent Per Month: <span>₹{room?.price} </span>
                  </span>
                </p>
              </div>

              <div className=" flex gap-4">
                <div className="my-5 px-2 lg:px-5">
                  {token ? (
                    <button className="px-5  py-2 bg-transparent rounded-full border-2 text-red-600 hover:border-red-600 hover:text-black flex items-center space-x-2">
                      <FaPhone className="w-5 h-5" />
                      <span>{room?.vendor?.contact}</span>
                    </button>
                  ) : (
                    <button
                      className="px-5 py-2 bg-transparent rounded-full border-2 text-red-600 hover:border-red-600 hover:text-black flex items-center space-x-2"
                      onClick={() => setPhoneModal(true)}
                    >
                      <FaPhone className="w-5 h-5" />
                      <span>Phone No</span>
                    </button>
                  )}
                </div>

                <div className="p-6">
                  <button
                    onClick={openModal}
                    className="inline-flex text-[14px] items-center lg:px-4 py-2 px-2 border border-transparent -base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Enquiry
                  </button>
                  {enquiryForm && (
                    <EnquiryForm
                      roomId={room._id} // Replace with actual roomId
                      // tifinId="exampleTifinId" // Replace with actual tifinId
                      isOpen={enquiryForm}
                      setModal={closeModal}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-5">
                {[
                  { label: "Deposit Amount", value: room?.depositeAmount },
                  {
                    label: "Maintenance",
                    value: room?.maintenance ? "Yes" : "No",
                  },
                  {
                    label: "Notice Period",
                    value: room?.noticePeriod || "None",
                  },
                  {
                    label: "Water Charges",
                    value: room?.waterCharges || "None",
                  },
                  {
                    label: "Food Availability",
                    value: room?.foodAvailable ? "Available" : "None",
                  },
                  { label: "AC Rooms", value: room?.ac ? "Available" : "None" },
                  {
                    label: "Parking",
                    value: room?.parking ? "Available" : "None",
                  },
                  {
                    label: "Power Backup",
                    value: room?.powerBackup ? "Available" : "None",
                  },
                  {
                    label: "Available For",
                    value: (() => {
                      switch (room?.AvailableForBoysOrGirl) {
                        case "boys":
                          return "Boys";
                        case "girls":
                          return "Girls";
                        case "boys&girls":
                          return "Boys And Girls";
                        default:
                          return room?.AvailableForBoysOrGirl || "N/A";
                      }
                    })(),
                  },
                  { label: "Total Room Available", value: room?.totalRoom },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
                  >
                    <span className="text-gray-600 font-semibold">
                      {item.label}
                    </span>
                    <p className="mt-2 text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-5 ">
            <div className="flex border-b justify-center">
              <button
                className={`px-4 font-bold py-2 mr-2 ${
                  activeTab === "rules"
                    ? "border-b-2 border-blue-500 text-yellow-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("rules")}
              >
                PG Rules
              </button>
              <button
                className={`px-4 font-bold py-2 mr-2 ${
                  activeTab === "amenities"
                    ? "border-b-2 border-blue-500 text-yellow-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("amenities")}
              >
                Common Area
              </button>
              <button
                className={`px-4 font-bold py-2 ${
                  activeTab === "charges"
                    ? "border-b-2 border-blue-500 text-yellow-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("charges")}
              >
                Other Charges
              </button>
            </div>
            <div className="p-4">{renderTabContent()}</div>
          </div>
        </div>
      ) : (
        <p>Room not found</p>
      )}

      <div>
        {alreadyRating ? (
          <div className=" max-w-7xl mx-auto p-4">
            <h3 className=" text-center text-xl">My Rating</h3>

            <div>
              <div className="p-5 bg-white shadow-md rounded-lg flex items-start space-x-4">
                <Image
                  src={user?.image}
                  alt={`${user?.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <ReactStars
                      count={5}
                      value={ratingData?.rating}
                      size={24}
                      edit={false}
                      isHalf={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(ratingData?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-gray-700">{ratingData?.review}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" max-w-7xl mx-auto p-4 flex justify-center">
            <button
              onClick={reviewAdd}
              className=" bg-yellow-600 px-2 py-1 text-white rounded-2xl"
            >
              {" "}
              Add review
            </button>
          </div>
        )}
      </div>

      <div>
        {ratingAverage ? (
          room ? (
            <ReviewDetails
              data={room?.ratingAndReviews}
              avrageRating={ratingAverage}
            />
          ) : null
        ) : (
          <div className="mb-6 text-center">
            <div className="flex justify-center items-center mt-2">
              <ReactStars
                count={5}
                value={ratingAverage || 0}
                size={30}
                edit={false}
                isHalf={true}
                activeColor="#ffd700"
              />
              <span className="ml-2 text-xl text-gray-600">
                {ratingAverage}
              </span>
            </div>
            <p className="text-center text-gray-500">No reviews available.</p>
          </div>
        )}
      </div>

      {
        <>
          <LoginModal
            show={loginModal}
            onClose={setLoginModal}
            revieModal={setReviewModal}
          />
          <PhoneModal show={phoneModal} onClose={setPhoneModal} />
        </>
      }
      {reviewModal && (
        <CourseReviewModal setReviewModal={setReviewModal} roomId={room._id} />
      )}
    </div>
  );
};

export default SingleRoom;
