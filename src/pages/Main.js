import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";

import FirstNotification from "../pages/FirstNotification";
import Swiper from "../components/main/MainSwiper";
import Category from "../components/main/Category";
import { isIPhone } from "../shared/DeviceDetector";

import {
  main_all,
  main_nature,
  main_object,
  main_space,
} from "../static/images";

import firebase from "firebase/compat/app"; //firebase모듈을 import해줘야 합니다.
import { getMessaging, getToken } from "firebase/messaging";
// window.open("intent://www.naver.com#Intent;scheme=http;package=com.android.chrome;end");

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
console.log(process.env);

const Main = (props) => {
  if (/android/i.test(navigator.userAgent)) {
    window.open(
      "intent://www.zzzapp.co.kr#Intent;scheme=http;package=com.android.chrome;end"
    );
    // window.open("googlechrome:////www.zzzapp.co.kr");
  } else if (/iPhone|iPad/i.test(navigator.userAgent)) {
    // window.open("googlechrome:////www.zzzapp.co.kr");
    alert("크롬또는 사파리에서 실행시켜주세요");
    // window.location.href = 'kakaotalk://inappbrowser/close';
  }

  // isIPhone().then((result) => {
  //   if (result) {
  //     alert("크롬 또는 사파리에서 실행 시켜 주세요");
  //   } else {
  //     window.open(
  //       "intent://www.zzzapp.co.kr#Intent;scheme=http;package=com.android.chrome;end"
  //     );
  //   }
  // });

  getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  })
    .then((currentToken) => {
      history.pushtoken = currentToken;
      console.log(currentToken);
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
        alert("푸쉬알림을 위해 알림권한을 허용하셔야합니다.");
      }
    });

  function Mobile() {
    return /iPhone|iPad/i.test(navigator.userAgent);
  }
  const [ios, setIos] = useState(Mobile()); // IOS이면 true, 나머지는 false
  const [noticationModal, setNoticationModal] = useState(true);
  const location1 = useLocation();
  // eslint-disable-next-line no-unused-vars
  let [permission, setPermission] = useState(false);
  const token = localStorage.getItem("token");
  const noticeSet = JSON.parse(localStorage.getItem("noticeSet"));

  useEffect(() => {
    console.log(token, ios, permission);

    // if (!noticeSet && token && !ios && permission) {
    //   setNoticationModal(true);
    // }

    if (location1.route) {
      history.push(location1.route);
    }
  }, []);

  return (
    <>
      <Container>
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
