import React from "react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Slider = () => {
  const sliderContent = [
    {
      "img": "/assets/image1.jpg",
      "title": "Inauguration of MIHS",
      "description": "Celebrating the launch of a new era in healthcare excellence."
    },
    {
      "img": "/assets/image2.jpg",
      "title": "क्यान्सर हेरचाह केन्द्र कार्यक्रम",
      "description": "Empowering lives through advanced cancer care and support."
    },
    {
      "img": "/assets/image3.jpg",
      "title": "क्यान्सर हेरचाह मा अन्तरक्रिया कार्यक्रम",
      "description": "Fostering collaboration and innovation in cancer care."
    },
    {
      "img": "/assets/image4.jpg",
      "title": "सुपर स्पेशलिटी अस्पतालमा ओटीको उद्घाटन",
      "description": "Inaugurating state-of-the-art operation theaters for superior medical care."
    },
    {
      "img": "/assets/image5.jpg",
      "title": "क्यान्सर हेरचाह केन्द्र कार्यक्रम",
      "description": "Dedicated to providing compassionate and comprehensive cancer care."
    },
    {
      "img": "/assets/image6.jpg",
      "title": "क्यान्सर हेरचाह मा अन्तरक्रिया कार्यक्रम",
      "description": "Enhancing patient care through interactive and innovative programs."
    },
    {
      "img": "/assets/image7.png",
      "title": "Inauguration of MIHS",
      "description": "Marking the beginning of a transformative journey in healthcare services."
    }
  ]

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] z-0 overflow-hidden">
      <Swiper
        modules={[A11y, Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
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
              {/* Image container with responsive positioning */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.description}
                  className="w-full h-full object-cover object-top 
                           md:object-center md:scale-100 
                           transition-transform duration-1000 ease-in-out 
                           transform hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Content Container */}
              <div className="absolute bottom-0 left-0 right-0 text-center text-white px-4 pb-4 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-24 space-y-2">
                <h2 className="text-xl font-bold mb-1 drop-shadow-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl animate-fade-in-up">
                  {item.title}
                </h2>
                <p className="text-sm max-w-xs mx-auto opacity-95 font-medium sm:max-w-sm sm:text-base md:text-lg lg:text-xl animate-fade-in-up delay-100">
                  {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="flex justify-between px-2 md:px-4 absolute top-1/2 -translate-y-1/2 w-full z-20">
        <button className="swiper-button-prev group p-1 md:p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 active:scale-95 sm:p-3">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-gray-200 text-xs md:text-sm lg:text-xl group-hover:text-gray-50 transition-colors duration-300"
          />
        </button>
        <button className="swiper-button-next group p-1 md:p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 active:scale-95 sm:p-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-200 text-xs md:text-sm lg:text-xl group-hover:text-gray-50 transition-colors duration-300"
          />
        </button>
      </div>

      {/* Pagination Bullets */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="swiper-pagination scale-75 md:scale-100"></div>
      </div>
    </div>
  );
};

export default Slider;