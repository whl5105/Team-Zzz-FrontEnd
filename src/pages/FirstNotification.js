import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ModalPopUp from "../components/ModalPopUp";
import Notifications from "../components/notication/Notification";

const PushNoticationPop = (props) => {
  const [notice, setNotice] = useState(true);
  const [day, setDay] = useState("오후");
  const [hour, setHour] = useState(12);
  const [minutes, setMinutes] = useState(0);

  const [dayActive, setDayActive] = useState(false);
  const [hourActive, setHourActive] = useState(false);
  const [minutesActive, setMinutesActive] = useState(false);

  const { setNoticationModal } = props;

  useEffect(() => {
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
