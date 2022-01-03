import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay]);

const MainSwiper = () => {
  return (
    <main className="ExampleComponent">
      <div className="main-wrap">
        <Swiper
          style={{
            width: "335px",
            height: "170px",
            backgroundColor: "#FFF5F1",
            borderRadius: "12px",
          }}
          spaceBetween={8}
          initialSlide={1}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>슬라이더1</SwiperSlide>
          <SwiperSlide>슬라이더2</SwiperSlide>
          <SwiperSlide>슬라이더3</SwiperSlide>
        </Swiper>
      </div>
    </main>
  );
};

export default MainSwiper;
