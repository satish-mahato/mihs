import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const SliderSection = () => {
  const officeBearers = [
    {
      name: " Hon’ble Satish Singh",
      position: " Chief Minister / Chancellor",
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
    <div className="bg-gray-100 py-10">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Meet Our Leadership and Administrators
      </h2>
      <h3 className="text-center text-lg font-semibold text-gray-600 mb-8">
        Office Bearers
      </h3>

      <div className="container mx-auto px-4">
        <Swiper
          navigation={false}
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true} // Enable infinite scrolling
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {officeBearers.map((bearer, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-between h-64">
                <div className="relative group">
                  <img
                    src={bearer.image}
                    alt={bearer.name}
                    className="w-28 h-28 rounded-full mb-4 transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-800">
                  {bearer.name}
                </h4>
                <p className="text-gray-600">{bearer.position}</p>
                {bearer.email ? (
                  <p className="flex items-center gap-2 text-blue-500">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                    <a href={`mailto:${bearer.email}`}>{bearer.email}</a>
                  </p>
                ) : (
                  <div className="h-6"></div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderSection;
