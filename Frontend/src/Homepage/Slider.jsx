import React from "react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const sliderContent = [
    {
      img: "/assets/image1.jpg",
      title: "Discover Nature",
      description: "Explore the beauty of wild landscapes",
    },
    {
      img: "/assets/image2.jpg",
      title: "Mountain Adventures",
      description: "Experience thrilling peaks",
    },
    {
      img: "/assets/image3.jpg",
      title: "Ocean Wonders",
      description: "Dive into blue mysteries",
    },
    {
      img: "/assets/image4.jpg",
      title: "Desert Magic",
      description: "Witness golden horizons",
    },
    {
      img: "/assets/image5.jpg",
      title: "Forest Secrets",
      description: "Walk through ancient trees",
    },
    {
      img: "/assets/image6.jpg",
      title: "City Lights",
      description: "Feel urban energy",
    },
    {
      img: "/assets/image7.png",
      title: "Night Sky",
      description: "Marvel at cosmic wonders",
    },
  ];

  return (
    <div className="relative w-full h-screen z-0 touch-pan-y">
      <Swiper
        modules={[A11y, Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        loop={true}
        speed={800}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
        }}
        className="h-full"
      >
        {sliderContent.map((item, i) => (
          <SwiperSlide key={i} className="relative">
            <div className="relative h-full w-full">
              {/* Image container */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.description}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  style={{
                    transform: 'translateZ(0)',
                    touchAction: 'pan-y'
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content Container */}
              <div className="absolute bottom-0 left-0 right-0 text-center text-white px-4 
                pb-8 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-32 space-y-4">
                <h2 className="text-2xl font-bold mb-2 drop-shadow-2xl
                  sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl animate-fade-in-up">
                  {item.title}
                </h2>
                <p className="text-base max-w-2xl mx-auto opacity-95 font-medium
                  sm:text-lg md:text-xl lg:text-2xl animate-fade-in-up delay-100">
                  {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="flex justify-between px-4 absolute top-1/2 -translate-y-1/2 w-full z-20">
        <button className="swiper-button-prev bg-white/20 p-2 md:p-3 rounded-full backdrop-blur-sm 
          hover:bg-white/30 transition-all scale-75 md:scale-100 active:scale-95">
          {/* SVG arrow */}
        </button>
        <button className="swiper-button-next bg-white/20 p-2 md:p-3 rounded-full backdrop-blur-sm 
          hover:bg-white/30 transition-all scale-75 md:scale-100 active:scale-95">
          {/* SVG arrow */}
        </button>
      </div>
    </div>
  );
};

export default Slider;