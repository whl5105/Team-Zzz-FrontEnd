import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as noticeActions } from "../../redux/modules/notice";
import axios from "axios";

// --- components ---
import { DropDown, Toggle, Button } from "../../elements/index";

const Notifications = (props) => {
  const userToken = localStorage.getItem("token");

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
        dispatch(noticeActions.setNoticeDB(props.notice));
      } else {
        dispatch(
          noticeActions.setNoticeDB(
            props.notice,
            props.day,
            props.hour,
            props.minutes
          )
        );
        axios
          .get(`https://www.zzzback.shop/api/location/${history.pushtoken}`, {
            headers: { authorization: `Bearer ${userToken}` },
          })
          .then((res) => {
            console.log(res);
          });
      }

      localStorage.setItem("noticeSet", true);
      props.setNoticationModal(false);
    } else {
      if (!props.notice) {
        dispatch(noticeActions.updateNoticeDB(props.notice));
      } else {
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
