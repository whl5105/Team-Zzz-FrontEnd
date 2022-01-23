import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import { actionCreators as noticeActions } from "../redux/modules/notice";
import { history } from "../redux/configureStore";

import Notifications from "../components/notication/Notification";
import Title from "../components/Title";



const MyPageNotification = (props) => {
  const dispatch = useDispatch()
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

  const notices = useSelector((state) => state.notice.time?state.notice.time.sleepChk:null);
  const days = useSelector((state) => state.notice.time?state.notice.time.timePA:null);
  const hours = useSelector((state) => state.notice.time?state.notice.time.hour:null);
  const minute = useSelector((state) => state.notice.time?state.notice.time.min:null);

  const [notice, setNotice] = useState(notices);
  const [day, setDay] = useState(days);
  const [hour, setHour] = useState(hours);
  const [minutes, setMinutes] = useState(minute);

  const [dayActive, setDayActive] = useState(false);
  const [hourActive, setHourActive] = useState(false);
  const [minutesActive, setMinutesActive] = useState(false);
console.log(days, hours, minute)
  React.useEffect(()=>{
    dispatch(noticeActions.getNoticeDB());
    if(notices===null){
      history.push('/mypage')
    }
    
  })

  return (
    <Container>
      <Title backIcon>알림 편집</Title>
      <Content>
        <Notifications
          notice={notice}
          setNotice={setNotice}
          day={day}
          setDay={setDay}
          hour={hour}
          setHour={setHour}
          minutes={minutes}
          setMinutes={setMinutes}
          dayActive={dayActive}
          setDayActive={setDayActive}
          hourActive={hourActive}
          setHourActive={setHourActive}
          minutesActive={minutesActive}
          setMinutesActive={setMinutesActive}
          state="update"
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  height: inherit;
  box-sizing: border-box;
  padding: 50px 0;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.colors.back};
  border-radius: 12px;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  margin: ${({ theme }) => theme.horizontalityInterval.base};
`;

export default MyPageNotification;
