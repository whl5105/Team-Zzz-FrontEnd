import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { history } from "../../redux/configureStore";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";

import RequireLogin from "../RequireLogin";

// --- images ---
import {
  main_diary,
  main_sleepTime,
  main_feedback,
} from "../../static/images/index";

SwiperCore.use([Pagination, Autoplay]);

const MainSwiper = withRouter((props) => {
  const token = localStorage.getItem("token");
  const [diaryModal, setDiaryModal] = React.useState(false);
  const diaryClick = () => {
    if (!token) {
      setDiaryModal(true);
    } else {
      history.push("/diary");
    }
  };

  const closeModal = () => {
    setDiaryModal(false);
  };

  const loginModal = () => {
    setDiaryModal(false);
    history.push("/login");
  };

  const swiperStyle = {
    height: "170px",
    backgroundColor: "rgb(59 63 121)",
    borderRadius: "12px",
  };

  return (
    <Main className="ExampleComponent">
      <div className="main-wrap">
        <Swiper
          style={{
            ...swiperStyle,
          }}
          spaceBetween={0}
          initialSlide={1}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide onClick={diaryClick}>
            <BannerImg bannerImage={main_diary} />
          </SwiperSlide>
          <SwiperSlide
            onClick={() => {
              history.push("/clock");
            }}
          >
            <BannerImg bannerImage={main_sleepTime} />
          </SwiperSlide>
          <SwiperSlide
            onClick={() => {
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSfdn7OIKJYKQLfzNScDvBSCvv07yH9cuyjORoNyE_GNHfaG_w/viewform?vc=0&c=0&w=1&flr=0",
                "_blank"
              );
            }}
          >
            <BannerImg bannerImage={main_feedback} />
          </SwiperSlide>
        </Swiper>
      </div>
      {diaryModal && <RequireLogin close={closeModal} move={loginModal} />}
    </Main>
  );
});

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
