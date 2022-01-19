import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";

// --- components ---
import FirstNotification from "../pages/FirstNotification";
import Swiper from "../components/main/MainSwiper";
import Category from "../components/main/Category";

// --- images ---
import {
  main_all,
  main_nature,
  main_object,
  main_space,
} from "../static/images";

// firebas
import firebase from "firebase/compat/app"; //firebase모듈을 import해줘야 합니다.
import { getMessaging, getToken } from "firebase/messaging";

const config = {
  apiKey: "AIzaSyD7vx1YcQDmd7Gom-mOGzB_j_oYD4qjR9M",
  authDomain: "pushnotificationtest-9e21c.firebaseapp.com",
  projectId: "pushnotificationtest-9e21c",
  storageBucket: "pushnotificationtest-9e21c.appspot.com",
  messagingSenderId: "1019872102596",
  appId: "1:1019872102596:web:57ec3461348eca0ea1e191",
  measurementId: "G-TFEDXNHVGY",
};
firebase.initializeApp(config);

const messaging = getMessaging();

const Main = () => {
  getToken(messaging, {
    vapidKey:
      "BHpAKY7pMnF5to1B-R9DDGRn5w6a5APBojAnwVr1ZyW56w4sPQGqIoCZphWfSHyohcOmKeuvvJHPj8B2KAZT4Ko",
  })
    .then((currentToken) => {
      console.log(currentToken);
      if (currentToken) {
        permission = true;
        if (!noticeSet && token && !ios && permission) {
          setNoticationModal(true);
        }

        history.pushtoken = currentToken;
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      alert("푸쉬알림을 위해 알림권한을 허용하셔야합니다.");
    });

  function Mobile() {
    return /iPhone|iPad/i.test(navigator.userAgent);
  }
  const [ios, setIos] = React.useState(Mobile()); // IOS이면 true, 나머지는 false
  const [noticationModal, setNoticationModal] = React.useState(true);
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  let [permission, setPermission] = React.useState(false);
  const token = localStorage.getItem("token");
  const noticeSet = JSON.parse(localStorage.getItem("noticeSet"));

  React.useEffect(() => {
    console.log(token, ios, permission);

    if (!noticeSet && token && !ios && permission) {
      setNoticationModal(true);
    }

    if (location.route) {
      history.push(location.route);
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

// --- styled-components ---
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
