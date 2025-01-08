import React from "react";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Slider = () => {
  const sliderContent = [
    { img: "/assets/image1.jpg", description: "this is one" },
    { img: "/assets/image2.jpg", description: "this is two" },
    { img: "/assets/image3.jpg", description: "this is three" },
    { img: "/assets/image4.jpg", description: "this is four" },
    { img: "/assets/image5.jpg", description: "this is five" },
    { img: "/assets/image6.jpg", description: "this is six" },
    { img: "/assets/image7.png", description: "this is seven" },
  ];

  return (
    <div className="relative w-full z-10">
      <Swiper
        modules={[A11y, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        className="shadow-lg overflow-hidden"
      >
        {sliderContent.map((item, i) => (
          <SwiperSlide key={i} className="relative">
            <img
              src={item.img}
              alt={item.description}
              className="w-full object-cover transition-all duration-500 hover:scale-102 hover:brightness-110
                sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
