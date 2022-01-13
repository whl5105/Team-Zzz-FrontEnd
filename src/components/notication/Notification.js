import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as noticeActions } from "../../redux/modules/notice";

// --- components ---
import DropDown from "../../elements/DropDown";
import Toggle from "../../elements/Toggle";
import Button from "../../elements/Button";

const Notifications = (props) => {
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
        <div style={{margin:"auto 0px"}}>
        수면 기록 알림 받기
        </div>
        <Toggle
          notice={props.notice}
          setNotice={props.setNotice}
          label=" "
        ></Toggle>
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
            ></DropDown>
            <DropDown
              hourActive={props.hourActive}
              setDayActive={props.setDayActive}
              setHourActive={props.setHourActive}
              setMinutesActive={props.setMinutesActive}
              condition={"시"}
              title={props.hour}
              hourItems={hourItems}
              state={props.setHour}
            ></DropDown>
            <DropDown
              minutesActive={props.minutesActive}
              setDayActive={props.setDayActive}
              setHourActive={props.setHourActive}
              setMinutesActive={props.setMinutesActive}
              condition={"분"}
              title={props.minutes === 0 ? "00" : props.minutes}
              minutesItems={minutesItems}
              state={props.setMinutes}
            ></DropDown>
          </Wrap>
        </>
      ) : (
        <Wrap>
          <DropDown state="disabled" condition={""} title={"PM"}></DropDown>
          <DropDown state="disabled" condition={"시"} title={"12"}></DropDown>
          <DropDown state="disabled" condition={"분"} title={"00"}></DropDown>
        </Wrap>
      )}

      <Button _onClick={send} marginT="20">확인</Button>
    </>
  );
};

// --- styled-components ---
const Wrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom:"10px";
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
  width: 295px;
  height: 30px;
  margin-top: 20px;
  
  margin-bottom: 20px;
`;


export default Notifications;
