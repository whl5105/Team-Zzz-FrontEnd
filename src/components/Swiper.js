import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";

//상단 banner 이미지
import all from "../static/images/banner/all_1005px.png";

SwiperCore.use([Pagination, Autoplay]);

const MainSwiper = () => {
  return (
    <main className="ExampleComponent">
      <div className="main-wrap">
        <Swiper
          style={{
            width: "100%",
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
          <SwiperSlide
            bg={all}
            onClick={() => {
              history.push("/diary");
            }}
          >
            <BannerImg bannerImage={all} />
            나의 수면 다어리 기록하기
          </SwiperSlide>
          <SwiperSlide
            onClick={() => {
              history.push("/clock");
            }}
          >
            <BannerImg bannerImage={all} />
            최적수면시간
          </SwiperSlide>
          <SwiperSlide
            onClick={() => {
              window.alert("피드백 중비중 입니다 ! ");
            }}
          >
            <BannerImg bannerImage={all} />
            피드백
          </SwiperSlide>
        </Swiper>
      </div>
    </main>
  );
};
const BannerImg = styled.div`
  width: 100%;
  height: 170px;
  background-image: url(${(props) => props.bannerImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

export default MainSwiper;
