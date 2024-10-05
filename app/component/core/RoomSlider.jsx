// ImageSlider.js
import React, { useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Virtual,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/virtual";
import FullscreenModal from "./FullscreenModal"; // Ensure this path is correct
import Image from "next/image";

export default function ImageSlider({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    swiperRef.current.swiper.slideTo(index);
  };

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const swiperRef = React.useRef(null);

  return (
    <div className="lg:h-[50vh] w-full flex gap-10 ">
      {/* Thumbnails */}
      <div className="flex flex-col w-24 overflow-y-auto mobile">
        {images.map((slide, index) => (
          <div
            key={index}
            className={`thumbnail-item p-2 border ${
              index === selectedIndex ? "active" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={slide.url}
              alt="thumbnail"
              className="w-full h-16 mb-2 cursor-pointer object-cover"
            />
          </div>
        ))}
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Scrollbar, Autoplay, Virtual]}
        spaceBetween={20}
        slidesPerView={1.5} // Display 1.5 slides at a time
        centeredSlides={true} // Center the active slide
        // navigation
        pagination={{ clickable: true }}
        // loop={true}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: false,
          disableOnInteraction: true,
        }}
        className="flex-1"
        breakpoints={{
          768: { slidesPerView: 1.5 }, // Adjust for larger screens
          0: { slidesPerView: 1.5 }, // Adjust for smaller screens
        }}
      >
        {images.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[200px] lg:min-h-screen ">
              <Image
                className="cursor-pointer object-cover"
                src={slide.url}
                alt={`slide-${index}`}
                onClick={() => handleImageClick(index)} // Open modal on image click
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <FullscreenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slides={images}
        currentIndex={selectedIndex}
      />
    </div>
  );
}