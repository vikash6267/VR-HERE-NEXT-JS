'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import NavbarContainer from "../component/common/Navbar/Navbar";
import Footer from "../component/common/footer/Footer";
import Loading from "../component/common/Loading";
import { createContact } from "../service/operations/user";
import { FaInstagram, FaLinkedin, FaPhone, FaYoutube, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


 const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await dispatch(createContact(data));
    setLoading(false);
    if (res) {
      reset();
    }
  };

  return (
    <>
      <NavbarContainer />

      <div className="max-w-7xl mx-auto p-5">
        <p className="text-center font-bold text-3xl text-yellow-600">
          Let’s Contact With Us - VR Here
        </p>
        <p className="text-center text-xl my-6 leading-8">
          Please Feel Free to Contact with VR Here and team for any PG and Tiffin
          Booking related Issues, Complaints and for any support needed for
          moving to the PG and Tiffin you have Booked through us.
        </p>
      </div>
      <div className="max-w-7xl mx-auto p-5">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid lg:grid-cols-2 items-center gap-5">
            <div>
              <div className="first flex flex-col gap-8">
              <div className="flex items-center gap-4">
  <span className="px-4 py-3 bg-yellow-600 rounded-md text-xl">
    <MdEmail />
  </span>
  <span>
    <a href="mailto:vrhere.in@gmail.com">vrhere.in@gmail.com</a>
  </span>
</div>
<div className="flex items-center gap-4">
  <span className="px-4 py-3 bg-yellow-600 rounded-md text-xl">
    <FaPhone />
  </span>
  <span>
    <a href="tel:+916267144122">+91 6267144122</a> || 
    <a href="tel:+919009594537">9009594537</a>
  </span>
</div>


                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/mahi_technocrafts?utm_source=qr&igsh=MWlscG85aHdvbjQxZw=="
                    target="_blank"
                    className="text-black text-xl hover:text-yellow-600 transition"
                  >
                    <FaInstagram size={28} />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61564583516735&mibextid=ZbWKwL"
                    target="_blank"
                    className="text-black text-xl hover:text-yellow-600 transition"
                  >
                    <FaFacebook size={28} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/mahi-technocrafts"
                    target="_blank"
                    className="text-black text-xl hover:text-yellow-600 transition"
                  >
                    <FaLinkedin size={28} />
                  </a>
                  <a
                    href="https://youtube.com/@mcawalarishigamingyt?si=xgoWmfSgSk3vCMZ6"
                    target="_blank"
                    className="text-black text-xl hover:text-yellow-600 transition"
                  >
                    <FaYoutube size={28} />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full max-w-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-group">
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter Your Name"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full border border-yellow-600 outline-none p-3 ${
                      errors.name ? "border-red-500" : "focus:border-yellow-600"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    placeholder="Enter Your Email"
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Entered value does not match email format",
                      },
                    })}
                    className={`w-full border border-yellow-600 outline-none p-3 ${
                      errors.email ? "border-red-500" : "focus:border-yellow-600"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact" className="block text-gray-700">
                    Contact
                  </label>
                  <input
                    id="contact"
                    placeholder="Enter Your Contact Number"
                    type="text"
                    {...register("contact", {
                      required: "Contact number is required",
                    })}
                    className={`w-full border border-yellow-600 outline-none p-3 ${
                      errors.contact ? "border-red-500" : "focus:border-yellow-600"
                    }`}
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm">{errors.contact.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="block text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter Your Query"
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className={`w-full border border-yellow-600 outline-none p-3 ${
                      errors.message ? "border-red-500" : "focus:border-yellow-600"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-black text-xl hover:text-white py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:border-yellow-600 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <br />

      <Footer />
    </>
  );
};

export default Contact
