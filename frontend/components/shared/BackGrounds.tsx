"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BackGrounds: React.FC = () => {
  const videos = [
    "/assets/videos/myco1.mp4",
    "/assets/videos/myco2.mp4",
    "/assets/videos/myco3.mp4",
    "/assets/videos/myco4.mp4",
  ];

  return (
    <div className="relative">
      <Swiper
        spaceBetween={100}
        slidesPerView="auto"
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
      >
        {videos.map((video, idx) => (
          <SwiperSlide key={idx}>
            <video
              className="w-full h-full overflow-hidden cursor-default"
              loop
              autoPlay
              muted
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination text-center z-20 absolute bottom-0"></div>
    </div>
  );
};

export default BackGrounds;
