import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";

import FirstNotification from "../pages/FirstNotification";
import Swiper from "../components/main/MainSwiper";
import Category from "../components/main/Category";
import { isIPhone, isMobile, isInapp } from "../shared/DeviceDetector";

import {
  main_all,
  main_nature,
  main_object,
  main_space,
} from "../static/images";

import firebase from "firebase/compat/app"; //firebase모듈을 import해줘야 합니다.
import { getMessaging, getToken } from "firebase/messaging";

const Main = (props) => {
  if (!isIPhone) {
    const config = { 
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };
    firebase.initializeApp(config);

    const messaging = getMessaging();

    getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    })
      .then((currentToken) => {
        localStorage.setItem("pushtoken", currentToken);
        if (currentToken) {
          permission = true;
          if (!noticeSet && token && !ios && permission) {
            setNoticationModal(true);
          }
        }
      })
      .catch((err) => {
        if (!ios) {
          console.log("An error occurred while retrieving token. ", err);
        }
      });
  }
  
  function Mobile() {
    return /iPhone|iPad/i.test(navigator.userAgent);
  }
  const [ios, setIos] = useState(Mobile()); // IOS이면 true, 나머지는 false
  const [noticationModal, setNoticationModal] = useState(false);
  const location = useLocation();
  let [permission, setPermission] = useState(false);
  const token = localStorage.getItem("token");
  const noticeSet = JSON.parse(localStorage.getItem("noticeSet"));

  useEffect(() => {
    if (isMobile && isInapp) {
      if (!isIPhone) {
        window.close();
        window.location.href =
          "intent://www.zzzapp.co.kr#Intent;scheme=http;package=com.android.chrome;end)";
      }
    }

    if (location.route) {
      history.push(location.route);
    }
  }, []);
  return (
    <>
      <Container>
        {/* <br></br> */}
        <Swiper />
        <Title>당신의 편안한 밤을 위해</Title>
        <Category
          path="/asmr"
          category="네이쳐"
          title="네이쳐"
          bannerImage={main_nature}
          subTitle="편안한 자연 속으로"
        />
        <Category
          path="/asmr"
          category="플레이스"
          title="플레이스"
          bannerImage={main_space}
          subTitle="다른 공간으로 여행"
        />
        <Category
          path="/asmr"
          category="오브젝트"
          title="오브젝트"
          bannerImage={main_object}
          subTitle="차분히 바라보는 물건들"
        />
        <Category
          path="/asmr"
          category="전체"
          title="모든 소리"
          bannerImage={main_all}
          subTitle="모든 소리 들어보기"
        />
      </Container>
      {noticationModal && (
        <FirstNotification
          modal={noticationModal}
          setNoticationModal={setNoticationModal}
        />
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: inherit;
  padding: 50px 20px 56px 20px;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  top: 0;
  left: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.p`
  padding: 30px 0 20px 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: ${({ theme }) => theme.lineHeight.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

export default Main;
