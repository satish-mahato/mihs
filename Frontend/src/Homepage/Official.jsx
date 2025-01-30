import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SliderSection = () => {
  const officeBearers = [
    {
      name: "Hon’ble Satish Singh",
      position: "Chief Minister / Chancellor",
      image: "/assets/team/pro.jpg",
      email: "chancellor@mihs.edu.np",
    },
    {
      name: "Hon’ble Shatrudhan Prasad Singh",
      position: "Ministry of Health & Population / Pro-Chancellor",
      image: "assets/team/pro1.jpg",
      email: "pc@mihs.edu.np",
    },
    {
      name: "Prof. Dr. Ankur Shah",
      position: "Vice Chancellor",
      image: "assets/team/sir2.png",
      email: "vc@mihs.edu.np",
    },
    {
      name: "Prof. Dr. Binod Kumar Yadav",
      position: "Registrar",
      image: "assets/team/sir1.png",
      email: "registrar@mihs.edu.np",
    },
    {
      name: "Dr. Jamun Prasad Singh",
      position: "Hospital Director",
      image: "assets/team/pro2.jpg",
      email: "director@mihs.edu.np",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Leadership & Administration
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Guiding Excellence in Health Sciences
          </p>
        </div>
        <div className="relative group">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Autoplay, EffectCoverflow]}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="pb-12"
          >
            {officeBearers.map((bearer, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mx-2 mb-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col items-center pt-8 pb-6">
                      <img
                        src={bearer.image}
                        alt={bearer.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <h4 className="text-xl font-bold text-gray-800 text-center mb-2">
                        {bearer.name}
                      </h4>
                      <p className="text-gray-600 text-sm text-center mb-4">
                        {bearer.position}
                      </p>
                      {bearer.email && (
                        <a
                          href={`mailto:${bearer.email}`}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="w-4 h-4"
                          />
                          <span className="text-sm break-all">
                            {bearer.email}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {/* Custom Navigation Arrows */}
            <div className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300 transform hover:scale-110">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-gray-700 text-lg md:text-xl"
              />
            </div>
            <div className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300 transform hover:scale-110">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-gray-700 text-lg md:text-xl"
              />
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SliderSection;