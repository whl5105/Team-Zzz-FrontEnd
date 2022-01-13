import React from "react";
import styled from "styled-components";

// -- components --
import ModalPopUp from "../components/ModalPopUp";
import Notifications from "../components/notication/Notification";

const PushNoticationPop = (props) => {
  // 설정된 알림 데이터
  const [notice, setNotice] = React.useState(true); // 알림 유무
  const [day, setDay] = React.useState("PM"); // 오전(true), 오후(false) 설정
  const [hour, setHour] = React.useState(12); // 시 설정
  const [minutes, setMinutes] = React.useState(0); // 분 설정

  // DropDown 활성화 유무
  const [dayActive, setDayActive] = React.useState(false);
  const [hourActive, setHourActive] = React.useState(false);
  const [minutesActive, setMinutesActive] = React.useState(false);

  React.useEffect(() => {
    if (!notice) {
      setDayActive(false);
      setHourActive(false);
      setMinutesActive(false);
    }
  }, [notice]);

  return (
    <>
      <ModalPopUp>
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
            setNoticationModal={props.setNoticationModal}
            state="set"
          ></Notifications>
        </Wrap>
      </ModalPopUp>
    </>
  );
};

// --- styled-components ---
const Wrap = styled.div`
  width: 331px;
  padding: 20px 20px;
  box-sizing: border-box;
`;

export default PushNoticationPop;
