import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as noticeActions } from "../../redux/modules/notice";
import axios from "axios";

// --- components ---
import { DropDown, Toggle, Button } from "../../elements/index";

// firebas
// import firebase from "firebase/compat/app"; //firebase모듈을 import해줘야 합니다.
// import { getMessaging, getToken } from "firebase/messaging";

// const config = {
//   apiKey: "AIzaSyD7vx1YcQDmd7Gom-mOGzB_j_oYD4qjR9M",
//   authDomain: "pushnotificationtest-9e21c.firebaseapp.com",
//   projectId: "pushnotificationtest-9e21c",
//   storageBucket: "pushnotificationtest-9e21c.appspot.com",
//   messagingSenderId: "1019872102596",
//   appId: "1:1019872102596:web:57ec3461348eca0ea1e191",
//   measurementId: "G-TFEDXNHVGY",
// };
// firebase.initializeApp(config);

// const messaging = getMessaging();

const Notifications = (props) => {

  const userToken= localStorage.getItem("token")
  
  const dispatch = useDispatch();
  const history = useHistory();

  const dayItems = ["AM", "PM"];
  const hourItems = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const minutesItems = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];

  const send = () => {
    if (props.state === "set") {
      if (!props.notice) {
        // 알림 안받는 경우 → 미들웨어에 기본값을 설정 해줘야 합니다.

        console.log("알림 X");
        dispatch(noticeActions.setNoticeDB(props.notice));
      } else {
        // 알림 받는 경우
        dispatch(
          noticeActions.setNoticeDB(
            props.notice,
            props.day,
            props.hour,
            props.minutes
          )
        );
        // axios
        //   .post(
        //     "https://fcm.googleapis.com/fcm/send",
        //     {
        //       notification: {
        //         body: "새로운글",
        //         title: "ㅇㅇdddddd",
        //       },
        //       to: history.pushtoken,
        //       // to: "ca6raRoo9-R4EJbNsHVWu9:APA91bGHhA4MgGyufmsOT5f8g8v2E9xshYaEH657lMg9f8gFQlWrMqI9DDkq-IPL1fWiDBnuQ409tAG8nf9jDtXsRmjxrKwocJQ_U7obsuub9mmDNsUWQBXCbHNtUKxGoqfYTw0dJujw",
        //     },
        //     {
        //       headers: {
        //         "Content-type": "application/json",
        //         Authorization:
        //           "key=AAAA7XUdSMQ:APA91bHiG3ONselw3DtnFO6-7Z2hPZq_qh9zQihBUnkrpebWvTNvSv1J8d5jQI4RgH3b7wXXlwQoQSTytd_lvwnFBeVkyV3-ShUa0HL_mpmcuBckF5bLlxhDertxC8YsONjZVntYrCk2",
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     console.log(res.data, res.config.data);
        //   });
            console.log(history.pushtoken)
            axios.get(`https://www.zzzback.shop/api/location/${history.pushtoken}`,
            {
              headers:{authorization: `Bearer ${userToken}`
          }      }).then((res)=>{
            console.log(res);

            })


      }

      localStorage.setItem("noticeSet", true);
      props.setNoticationModal(false);
    } else {
      if (!props.notice) {
        // 알림 안받는 경우 → 미들웨어에 기본값을 설정 해줘야 합니다.
        dispatch(noticeActions.updateNoticeDB(props.notice));
      } else {
        // 알림 받는 경우
        dispatch(
          noticeActions.updateNoticeDB(
            props.notice,
            props.day,
            props.hour,
            props.minutes
          )
        );
      }

      localStorage.setItem("noticeSet", true);
      history.replace("/myPage");
    }
  };

  return (
    <>
      <Title color={props.state === "update" ? "white" : null}>
        매일 알림 받고 기록하기
      </Title>
      <ToggleSwitch color={props.state === "update" ? "white" : null}>
        <div style={{ margin: "auto 0px" }}>수면 기록 알림 받기</div>
        <Toggle notice={props.notice} setNotice={props.setNotice} label=" " />
      </ToggleSwitch>
      {props.notice ? (
        <>
          <Wrap>
            <DropDown
              dayActive={props.dayActive}
              setDayActive={props.setDayActive}
              setHourActive={props.setHourActive}
              setMinutesActive={props.setMinutesActive}
              condition={""}
              title={props.day}
              dayItems={dayItems}
              state={props.setDay}
            />
            <DropDown
              hourActive={props.hourActive}
              setDayActive={props.setDayActive}
              setHourActive={props.setHourActive}
              setMinutesActive={props.setMinutesActive}
              condition={"시"}
              title={props.hour}
              hourItems={hourItems}
              state={props.setHour}
            />
            <DropDown
              minutesActive={props.minutesActive}
              setDayActive={props.setDayActive}
              setHourActive={props.setHourActive}
              setMinutesActive={props.setMinutesActive}
              condition={"분"}
              title={props.minutes === 0 ? "00" : props.minutes}
              minutesItems={minutesItems}
              state={props.setMinutes}
            />
          </Wrap>
        </>
      ) : (
        <Wrap>
          <DropDown state="disabled" condition={""} title={"PM"} />
          <DropDown state="disabled" condition={"시"} title={"12"} />
          <DropDown state="disabled" condition={"분"} title={"00"} />
        </Wrap>
      )}

      <Button _onClick={send} marginT="20">
        확인
      </Button>
    </>
  );
};

// --- styled-components ---
const Wrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: "10px";
`;

const Title = styled.p`
  color: ${(props) => (props.color === "white" ? "#ffffff" : "#222222")};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  letter-spacing: -0.3px;
  vertical-align: top;
  text-align: left;
`;

const ToggleSwitch = styled.div`
  color: ${(props) => (props.color === "white" ? "#ffffff" : "#222222")};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  letter-spacing: -0.3px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default Notifications;
