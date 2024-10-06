import React from "react";

import logo from "../../../assests/logo2.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {Image
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          <div className="mb-6 md:mb-0">
            <Image  width={500}         src={logo} alt="Logo" className="w-40 h-auto mb-4 md:mb-0" />
            <div className="flex space-x-4">
              {/* <Link
                href="#"
                className="text-white text-xl hover:text-gray-400 transition"
              >
                <FaFacebook />
              </Link>
              <Link
                href="#"
                className="text-white text-xl hover:text-gray-400 transition"
              >
                <FaTwitter />
              </Link> */}
              <Link
                target="_blank"
                href="https://www.instagram.com/vrhere.in"
                className="text-white text-xl hover:text-yellow-600 transition"
              >
                <FaInstagram />
              </Link>
              <Link
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61564583516735&mibextid=ZbWKwL"
                className="text-white text-xl hover:text-yellow-600 transition"
              >
                <FaFacebook />
              </Link>
              <Link
                href="https://www.linkedin.com/company/mahi-technocrafts"
                target="_blank"
                className="text-white text-xl hover:text-yellow-600 transition"
              >
                <FaLinkedin />
              </Link>
              <Link
                target="_blank"
                href="https://youtube.com/@mcawalarishigamingyt?si=xgoWmfSgSk3vCMZ6"
                className="text-white text-xl hover:text-yellow-600 transition"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-semibold mb-4 text-xl">Links</h3>
              <ul>
                <li className="mb-2">
                  <Link
                    href="/"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/contact-us"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/tifin-center"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Find Tifin
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/pg-room"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Find My PG/Room
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-xl">Services</h3>
              <ul>
                <li className="mb-2">
                  <Link
                    href="/tifin-center"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Tifin Center
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/pg-room"
                    className="hover:text-gray-400 transition-colors"
                  >
                    My PG/Room
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-xl">Usefull Links</h3>

              <ul>
                <li className="mb-2">
                  <Link
                    href="/term_condition"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Term And Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/privacy_policy"
                    className="hover:text-gray-400 transition-colors"
                  >
                 Privacy Policy
                  </Link>
                </li>
                           </ul>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <h3 className="font-semibold mb-4">Subscribe</h3>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full p-2 mb-4 rounded-md bg-gray-800 text-white border border-gray-600"
            />
            <button className="w-full py-2 bg-yellow-600 hover:bg-blue-600 text-white rounded-md transition">
              Subscribe
            </button>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          <Link
            href="https://mahitechnocrafts.in/"
            target="_blank"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            Made by Mahi Technocrafts ❤️
          </Link>
          <span className="block mt-2 text-gray-500">
            &copy; {new Date().getFullYear()} VR-Here. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
