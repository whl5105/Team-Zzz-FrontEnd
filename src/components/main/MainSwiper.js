import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";

// --- images ---
import banner1 from "../../static/images/banner/Main_BN_335px_1.png";
import banner2 from "../../static/images/banner/Main_BN_335px_2.png";
import banner3 from "../../static/images/banner/Main_BN_335px_3.png";

SwiperCore.use([Pagination, Autoplay]);

// --- jsx ---
const MainSwiper = () => {
  return (
    <Main className="ExampleComponent">
      <div className="main-wrap">
        <Swiper
          style={{
            width: "100%",
            height: "170px",
            backgroundColor: "rgb(59 63 121)",
            borderRadius: "12px",
          }}
          spaceBetween={0}
          initialSlide={1}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide
            onClick={() => {
              history.push("/diary");
            }}
          >
            <BannerImg bannerImage={banner1} />
          </SwiperSlide>
          <SwiperSlide
            onClick={() => {
              history.push("/clock");
            }}
          >
            <BannerImg bannerImage={banner2} />
          </SwiperSlide>
          <SwiperSlide
            onClick={() => {
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSfdn7OIKJYKQLfzNScDvBSCvv07yH9cuyjORoNyE_GNHfaG_w/viewform?vc=0&c=0&w=1&flr=0",
                "_blank"
              );
            }}
          >
            <BannerImg bannerImage={banner3} />
          </SwiperSlide>
        </Swiper>
      </div>
    </Main>
  );
};

// --- styled-components ---
const Main = styled.div`
  margin-top: ${({ theme }) => theme.margins.xxxxl};
`;

const BannerImg = styled.div`
  width: 100%;
  height: 170px;
  background-image: url(${(props) => props.bannerImage});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

export default MainSwiper;
