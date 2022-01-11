import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Notifications from "../components/Notification";

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
    <>
      <Title>알림 편집</Title>
      <Wrap>
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
      </Wrap>
    </>
  );
};

const Title = styled.p`
  position: absolute;
  width: 120px;
  height: 22px;
  left: 20px;
  top: 70px;
  font-size: 22px;
  line-height: 100%;
  color: white;
  margin: 0px;
`;

const Wrap = styled.div`
  position: absolute;
  width: 335px;
  height: 253px;
  left: 20px;
  top: 122px;
  margin: auto;
  background: ${({ theme }) => theme.colors.back};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  outline: none;
  box-sizing: border-box;
  padding:20px;
`;

export default MyPageNotification;
