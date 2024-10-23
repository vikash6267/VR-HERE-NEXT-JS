'use client'
import React, { useEffect, useState ,useCallback } from "react";
import { FaDollarSign, FaPhone, FaMapPin } from "react-icons/fa";

import { useSelector } from "react-redux";
import { checkRating, tifinAverageRating } from "../service/operations/user";
import { singleTifin } from "../service/operations/tifin";
import { useParams } from "next/navigation";
import NavbarContainer from "../component/common/Navbar/Navbar";
import LoginModal from "../component/common/LoginModal";
import CourseReviewModal from "../component/core/Review Rating/ReviewRating";
import PhoneModal from "../component/common/PhoneModal";
import RoomSlider from "../component/core/RoomSlider";
import ReactStars from "react-rating-stars-component";
import ReviewDetails from "../component/core/Review Rating/ReviewDetails";
import SevenDayMeal from "../component/core/SevenDayMeal";
import Loading from "../component/common/Loading";
import EnquiryForm from "../component/room/EnquiryForm";
import Image from "next/image";
import Head from "next/head";
function SingleTifin() {
  const { token, user } = useSelector((state) => state.auth);
  const { slug } = useParams();
  const [ratingAverage, setAverage] = useState(0);
  const [tifin, setTifin] = useState(null);
  const [loading, setLoading] = useState(true);
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


  const fetchSingleTifin = useCallback(async () => {
    try {
      setLoading(true);
      const response = await singleTifin(slug);
      setTifin(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching single tifin:", error);
      setLoading(false);
    }
  }, [slug]); // Include slug as dependency


  useEffect(() => {
    if (slug) {
      fetchSingleTifin();
    }
    // console.log(slug);
  }, [slug,fetchSingleTifin]);

  useEffect(() => {


    const fetchAerageRating = async () => {
      try {
        const response = await tifinAverageRating({ tifinId: tifin?._id }, token);
        setAverage(response);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRatingStaus = async () => {
      try {
        const response = await checkRating({ tifinId: tifin?._id }, token);
        // console.log(response);
        setAlreadyRating(response);
        setUserData(response?.alreadyReviewed);
      } catch (error) {
        console.log(error);
      }
    };
    
    if (tifin) {
      fetchAerageRating();
      if (token) {
        fetchRatingStaus();
      }
    }
  }, [tifin,token]);

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


  const roomimage = tifin?.images[0]?.url
 const roomUrl = `https://www.vrhere.in/tifin/${tifin.slug}`
  return (
    <>
     <Head>
        <title>{tifin?.name}</title>
        <meta name="description" content={tifin?. tifin?.description || "Discover the best tiffin service near VIT Bhopal University with affordable pricing and delicious food."} />
        <meta property="og:title" content={tifin?.name} />
        <meta property="og:description" content={tifin?. tifin?.description || "Discover the best tiffin service near VIT Bhopal University with affordable pricing and delicious food."} />
        <meta property="og:image" content={roomimage} />
        <meta property="og:url" content={roomUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tifin?.name} />
        <meta name="twitter:description"  content={tifin?. tifin?.description || "Discover the best tiffin service near VIT Bhopal University with affordable pricing and delicious food."} />
        <meta name="twitter:image" content={roomimage} />
<link rel="icon" href={roomimage} type="image/x-icon" />
        {/* Optional: Add Facebook and WhatsApp-specific image tags */}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

      </Head>

      <NavbarContainer />
      {loading ? (
        <Loading />
      ) : tifin ? (
        <div>
          {/* <div className="bg-gray-900 p-5 text-white">
      <div className="main lg:text-xl max-w-7xl mx-auto flex justify-between lg:items-center lg:flex-row gap-8">
        <div className="flex items-center space-x-">
          <div className="flex items-center space-x-">
                    <p className="grid">
              <span className="font-semibold">Price Per Month</span>
              <span>₹{tifin.price}</span>
            </p>
          </div>
          <div className="border-r-2 h-16 mx-3"></div>
          <div className="flex items-center space-x-2">
            <FaMapPin className="w-6 h-6 text-green-400" />
            <p className="grid">
              <span>{tifin.name}</span>
              <span>{tifin?.Location[0]?.name}</span>
            </p>
          </div>
        </div>
        <div>
          {token ? (
            <button className="px-5 py-2 bg-transparent rounded-full border-2 text-red-600 hover:border-red-600 hover:text-white flex items-center space-x-2">
              <FaPhone className="w-5 h-5" />
              <span>{tifin?.vendor?.contact}</span>
            </button>
          ) : (
            <button
              className="px-5 py-2 bg-transparent rounded-full border-2 text-red-600 hover:border-red-600 hover:text-white flex items-center space-x-2"
              onClick={() => setPhoneModal(true)}
            >
              <FaPhone className="w-5 h-5" />
              <span>Phone No</span>
            </button>
          )}
        </div>
      </div>
    </div> */}

          <div className="main grid grid-cols-1 lg:grid-cols-2 gap-5 my-10 px-5">
            <div>
              <RoomSlider images={tifin?.images} />
            </div>

            <div>
              <div className="px-5">
                <p className="lg:text-4xl md:text-3xl text-2xl ">
                  {tifin?.name}
                </p>
                <p className="lg:text-2xl md:text-2xl text-xl my-4 ">
                  <span>
                    Location: <span>{tifin?.Location[0]?.name}</span>
                  </span>
                </p>
                <p className="lg:text-2xl md:text-2xl text-xl my-4 ">
                  <span>
                    Per Month: <span>₹{tifin.price}</span>
                  </span>
                </p>


<div className=" flex gap-3">

                <div className="my-5">
                  {token ? (
                    <button className="px-5  py-2 bg-transparent rounded-full border-2 text-red-600 hover:border-red-600 hover:text-black flex items-center space-x-2">
                      <FaPhone className="w-5 h-5" />
                      <span>{tifin?.vendor?.contact}</span>
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
                      tifinId={tifin._id} // Replace with actual roomId
                      // tifinId="exampleTifinId" // Replace with actual tifinId
                      isOpen={enquiryForm}
                      setModal={closeModal}
                    />
                  )}
                </div>
</div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-5">
                {[
                  { label: "Meal Type", value: tifin?.type },
                  {
                    label: "Customized Meal",
                    value: tifin?.customize ? "Yes" : "No",
                  },
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
              <div className="p-4 mt-2">
                <SevenDayMeal menu={tifin?.menu} title="Seven Days Menu" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>tifin not found</p>
      )}

      <div>
        {alreadyRating ? (
          <div className=" max-w-7xl mx-auto p-4">
            <h3 className=" text-center text-xl">My Rating</h3>

            <div>
              <div className="p-5 bg-white shadow-md rounded-lg flex items-start space-x-4">
                <Image   width={500} height={600}
                  src={user?.image}
                  alt={`${user?.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <ReactStars
                      count={5}
                      value={ratingData?.rating || 0}
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
          tifin ? (
            <ReviewDetails
              data={tifin?.ratingAndReviews}
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
        <CourseReviewModal
          setReviewModal={setReviewModal}
          tifinId={tifin?._id}
        />
      )}
    </>
  );
}

export default SingleTifin;
