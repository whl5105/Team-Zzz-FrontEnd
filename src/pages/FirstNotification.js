import React from "react";
import styled from "styled-components";

import ModalPopUp from "../components/ModalPopUp";
import Notifications from "../components/notication/Notification";

const PushNoticationPop = (props) => {
  const [notice, setNotice] = React.useState(true);
  const [day, setDay] = React.useState("PM");
  const [hour, setHour] = React.useState(12);
  const [minutes, setMinutes] = React.useState(0);

  const [dayActive, setDayActive] = React.useState(false);
  const [hourActive, setHourActive] = React.useState(false);
  const [minutesActive, setMinutesActive] = React.useState(false);

  const { setNoticationModal } = props;

  React.useEffect(() => {
    if (!notice) {
      setDayActive(false);
      setHourActive(false);
      setMinutesActive(false);
    }
  }, [notice]);

  return (
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
          setNoticationModal={setNoticationModal}
          state="set"
        />
      </Wrap>
    </ModalPopUp>
  );
};

const Wrap = styled.div`
  padding: 20px 20px;
`;

export default PushNoticationPop;
