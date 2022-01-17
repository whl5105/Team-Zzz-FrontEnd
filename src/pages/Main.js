import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";
import axios from "axios";

// --- components ---
import FirstNotification from "../pages/FirstNotification";
import Swiper from "../components/main/MainSwiper";
import Category from "../components/main/Category";

// --- images ---
import all from "../static/images/banner/all_1005px.png";
import nature from "../static/images/banner/nature_1005px.png";
import object from "../static/images/banner/object_1005px.png";
import space from "../static/images/banner/space_1005px.png";

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

const Main = (props) => {
  //  console.log({...Notification.requestPermission})

  Notification.requestPermission().then(function (result) {
    console.log(result);
    console.log(Notification.permission);

    if (result === "granted") {
      getToken(messaging, {
        vapidKey:
          "BHpAKY7pMnF5to1B-R9DDGRn5w6a5APBojAnwVr1ZyW56w4sPQGqIoCZphWfSHyohcOmKeuvvJHPj8B2KAZT4Ko",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("알림 O");
            console.log(currentToken);
            permission = true;
            console.log(noticeSet, token, ios, permission);

            if (!noticeSet && token && !ios && permission) {
              setNoticationModal(true);
            }

            history.test = currentToken;
            console.log(history);
            // axios
            //   .post(
            //     "https://fcm.googleapis.com/fcm/send",
            //     {
            //       "notification": {
            //         "body": "새로운글",
            //         "title": "ㅇㅇdddddd",
            //       },
            //       "to": currentToken,
            //     },
            //     {
            //       headers: {
            //         "Content-type": "application/json",
            //         "Authorization": "key=AAAA7XUdSMQ:APA91bHiG3ONselw3DtnFO6-7Z2hPZq_qh9zQihBUnkrpebWvTNvSv1J8d5jQI4RgH3b7wXXlwQoQSTytd_lvwnFBeVkyV3-ShUa0HL_mpmcuBckF5bLlxhDertxC8YsONjZVntYrCk2",
            //       },
            //     }
            //   )
            //   .then((res) => {
            //     console.log(res.data, res.config.data);
            //   });
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    } else if (result === "denied") {
      console.log("권한 차단");
    }
  });

  function Mobile() {
    return /iPhone|iPad/i.test(navigator.userAgent);
  }
  const [ios, setIos] = React.useState(Mobile()); // IOS이면 true, 나머지는 false
  const [noticationModal, setNoticationModal] = React.useState(false);
  const location = useLocation();
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
    <Container>
      {/* swiper 부분 */}
      <Swiper />
      {/* <Asmr> */}
      {/* 카테고리 부분 */}
      <Title>당신의 편안한 밤을 위해</Title>
      <Category
        path="/asmr"
        category="네이쳐"
        title="네이쳐"
        bannerImage={nature}
        subTitle="편안한 자연 속으로"
      />
      <Category
        path="/asmr"
        category="플레이스"
        title="플레이스"
        bannerImage={space}
        subTitle="다른 공간으로 여행"
      />
      <Category
        path="/asmr"
        category="오브젝트"
        title="오브젝트"
        bannerImage={object}
        subTitle="차분히 바라보는 물건들"
      />
      <Category
        path="/asmr"
        category="전체"
        title="모든 소리"
        bannerImage={all}
        subTitle="모든 소리 들어보기"
      />
      {/* </Asmr> */}

      {/* 첫 로그인 시 알림 설정 팝업 부분 */}
      {noticationModal && (
        <FirstNotification
          modal={noticationModal}
          setNoticationModal={setNoticationModal}
        ></FirstNotification>
      )}
    </Container>
  );
};

// --- styled-components ---
const Container = styled.div`
  height: inherit;
  padding: 50px 20px 56px 20px;
  overflow-y: scroll;
  box-sizing: border-box;
  /* height: 720px; */
  /* height: calc(100% - 106px); */
  &::-webkit-scrollbar {
    display: none;
  }
  /* @media (max-width: 640px) {
    height: 89vh;
  } */
`;

const Title = styled.p`
  padding: 30px 0 20px 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: ${({ theme }) => theme.lineHeight.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

export default Main;
