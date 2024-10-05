import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaCloudSun, FaMoon, FaAngleDoubleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
// import {   useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../service/operations/user";
import { NavbarLinks } from "../../../constant/navbarLinks";
import Backdrop from "../Backdrop";
import LogoutModal from "./LogoutModal";
import logo from "../../../assests/logo2.png";
import Link from "next/link";

import { useRouter } from 'next/navigation'
import Image from "next/image";

function getGreeting() {
  const currentHour = new Date().getHours();
  let greeting = "";
  let icon = null;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
    icon = <FaSun className="text-yellow-500" />;
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
    icon = <FaCloudSun className="text-yellow-400" />;
  } else {
    greeting = "Good Evening";
    icon = <FaMoon className="text-blue-500" />;
  }

  return { greeting, icon };
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const hardcodedVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function MobileSidebar({ isOpen, setIsOpen }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  const { user } = useSelector((state) => state.auth);
  const { greeting, icon } = getGreeting();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      const scrollY =
        document.documentElement.style.getPropertyValue("--scroll-y");
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <Backdrop onClick={handleClose} />
          <motion.div
            ref={ref}
            className="fixed top-0 left-0 bottom-0 w-[320px] bg-black p-4 z-40 border-r-2 shadow-2xl text-lg overflow-y-auto text-white rounded-r-lg"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <motion.div
              className="w-11/12 mx-auto mt-6 uppercase"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                className="absolute top-2 right-2 hover:scale-110 cursor-pointer"
                onClick={handleClose}
                variants={hardcodedVariants}
              >
                <RxCross1 />
              </motion.div>
              <motion.div
                className="flex flex-col text-lg gap-1 items-center"
                variants={hardcodedVariants}
              >
                <div className="flex justify-center">
                  <Image
                    src={user?.image}
                    alt="User"
                    width={50}
                    className="rounded-full"
                  />
                </div>
                <div className="flex items-center mt-2">
                  <div className="mr-2">{icon}</div>
                  <div className="flex flex-col gap-3">{greeting}</div>
                </div>
                {user && (
                  <div className="flex gap-1 mt-1">
                    <p>{user.name}</p>
                  </div>
                )}
              </motion.div>
              <motion.div
                className="flex w-full mt-5 flex-col"
                variants={hardcodedVariants}
              >
                <motion.ul
                  className="flex flex-col justify-center text-[13px] gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {NavbarLinks.map((link, index) => (
                    <motion.li key={index} variants={itemVariants}>
                      <Link
                        href={link.path}
                        className="transition-colors duration-300 hover:text-blue-600 border-b-2 pb-1 tracking-wide"
                        onClick={() => setIsOpen(false)}
                      >
                        <p>{link.title}</p>
                      </Link>
                    </motion.li>
                  ))}
                  {user ? (
                    <>
                      <motion.li variants={itemVariants}>
                        <button
                          onClick={() => {
                            setShowLogoutModal(true);
                            setIsOpen(false);
                          }}
                          className="text-start text-red-500 mt-2"
                        >
                          Logout
                        </button>
                      </motion.li>
                    </>
                  ) : (
                    <>
                      <motion.li variants={itemVariants}>
                        <Link
                          href="/vendor"
                          className="text-white border-b-2 pb-1 tracking-wide mt-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Become Vendor
                        </Link>
                      </motion.li>
                    </>
                  )}

                  {(user?.role?.trim().toLowerCase() === "room" ||
                    user?.role?.trim().toLowerCase() === "tifin") && (
                    <Link
                      href="/vendor/dashboard"
                      className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                    >
                      Dashboard
                    </Link>
                  )}
                </motion.ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}

      <div key="logout-modal">
        {showLogoutModal && (
          <LogoutModal
            onClose={() => setShowLogoutModal(false)}
            onConfirmLogout={logoutHandler}
          />
        )}
      </div>
    </AnimatePresence>
  );
}

const DesktopNavbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter()

  // const navigate = useNavigate();

  const logoutHandler = () => {
    setShowLogoutModal(false);
    dispatch(logout());
  };

  return (
    <div className="bg-black ">
      <div className=" max-w-7xl mx-auto p-5 lg:p-0 hidden lg:flex justify-between items-center text-yellow-600">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" className="w-40 h-24 " />
        </div>
        <ul className="flex space-x-8 text-lg">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.path}
                className={`${
                  router.pathname === link.path
                    ? "bg-yellow-600 text-black font-bold rounded-full px-4 py-2"
                    : "hover:text-yellow-600 text-white transition-colors duration-300"
                }`}
              >
                {link.title}
              </Link>
            </li>
          ))}
          {user ? (
            <>
              {/* <li>
                <Link
                  href="/profile"
                  className={`${
                    location.pathname === "/profile"
                      ? "bg-blue-600 text-white font-bold rounded-full px-4 py-2"
                      : "hover:text-blue-400 transition-colors duration-300"
                  }`}
                >
                  My Profile
                </Link>
              </li> */}
              <li>
                <button
                  className="text-white hover:text-yellow-500 transition-colors duration-300"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>
                {showLogoutModal && (
                  <LogoutModal
                    onClose={() => setShowLogoutModal(false)}
                    onConfirmLogout={logoutHandler}
                  />
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/vendor"
                  className={`${"hover:text-yellow-600 text-white transition-colors duration-300"}`}
                >
                  Become Vendor
                </Link>
              </li>
            </>
          )}

          {(user?.role?.trim().toLowerCase() === "room" ||
            user?.role?.trim().toLowerCase() === "tifin") && (
            <li>
              {" "}
              <Link
                href="/vendor/dashboard"
                className="inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

function NavbarContainer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex  justify-between items-center p-4 lg:hidden bg-black text-white">
        <div className="text-xl font-bold">
          <Image src={logo} alt="Logo" className="w-24 h-16" />
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu className="text-yellow-500" size={32} />
        </button>
      </div>
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <DesktopNavbar />
    </>
  );
}

export default NavbarContainer;
