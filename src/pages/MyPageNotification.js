import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// --- components ---
import Notifications from "../components/notication/Notification";
import Title from "../components/Title";

const MyPageNotification = (props) => {
  // 기존 알림 데이터
  const notices = useSelector((state) => state.notice.time.sleepChk);
  const days = useSelector((state) => state.notice.time.timePA);
  const hours = useSelector((state) => state.notice.time.hour);
  const minute = useSelector((state) => state.notice.time.min);

  // 설정된 알림 데이터
  const [notice, setNotice] = React.useState(notices);
  const [day, setDay] = React.useState(days);
  const [hour, setHour] = React.useState(hours);
  const [minutes, setMinutes] = React.useState(minute);

  // DropDown 활성화 유무
  const [dayActive, setDayActive] = React.useState(false);
  const [hourActive, setHourActive] = React.useState(false);
  const [minutesActive, setMinutesActive] = React.useState(false);

  // -- jsx --
  return (
    <Container>
      <Title>알림 편집</Title>
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
        ></Notifications>
      </Content>
    </Container>
  );
};

// --- styled-components ---
const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 0;
`;

const Content = styled.div`
  background: #272a52;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 20px;
  margin: 0 20px;
`;

export default MyPageNotification;
