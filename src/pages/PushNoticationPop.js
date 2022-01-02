// 푸시 알림 팝업 페이지
import React from "react";
import Modal from "react-modal";
import Switch from "@mui/material/Switch";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as noticeActions } from "../redux/modules/notice";
import DropDown from "../elements/DropDown";

const PushNoticationPop = (props) => {
  const [modal, setModal] = React.useState(props.modal ? true : false); // 모달창
  const [notice, setNotice] = React.useState(true); // 알림 유무
  const [day, setDay] = React.useState("PM"); // 오전(true), 오후(false) 설정
  const [hour, setHour] = React.useState(12); // 시 설정
  const [minutes, setMinutes] = React.useState(0); // 분 설정

  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [dayActive, setDayActive] = React.useState(false);
  const [hourActive, setHourActive] = React.useState(false);
  const [minutesActive, setMinutesActive] = React.useState(false);

  const dayItems = ["AM", "PM"];
  const hourItems = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
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
    if (!notice) {
      // 알림 안받는 경우 → 미들웨어에 기본값을 설정 해줘야 합니다.
      dispatch(noticeActions.noticePopDB(notice));
    } else {
      // 알림 받는 경우
      dispatch(noticeActions.noticePopDB(notice, day, hour, minutes));
    }

    localStorage.setItem("noticeSet", true);
    props.setNoticationModal(false);
  };

  return (
    <>
      <Modal
        isOpen={modal}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 15, 15, 0)",
            zIndex: "1",
          },
          content: {
            position: "absolute",
            top: "60px",
            left: "35%",
            width: "30%",
            height: "80%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <h1>매일 알림 받고 기록하기</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          수면 기록 알림 받기 &nbsp;
          <Switch
            {...label}
            onClick={() => {
              setNotice(!notice);
              // setDayActive(false);
              // setHourActive(false);
              // setMinutes(false);
            }}
            style={{ color: "#FBC037" }}
            color="default"
            defaultChecked
          />
        </div>
        <div>
          {notice ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <DropDown
                  dayActive={dayActive}
                  setDayActive={setDayActive}
                  setHourActive={setHourActive}
                  setMinutesActive={setMinutesActive}
                  condition={""}
                  title={"PM"}
                  dayItems={dayItems}
                  state={setDay}
                ></DropDown>
                <DropDown
                  hourActive={hourActive}
                  setDayActive={setDayActive}
                  setHourActive={setHourActive}
                  setMinutesActive={setMinutesActive}
                  condition={"시"}
                  title={"12"}
                  hourItems={hourItems}
                  state={setHour}
                ></DropDown>
                <DropDown
                  minutesActive={minutesActive}
                  setDayActive={setDayActive}
                  setHourActive={setHourActive}
                  setMinutesActive={setMinutesActive}
                  condition={"분"}
                  title={"00"}
                  minutesItems={minutesItems}
                  state={setMinutes}
                ></DropDown>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <DropDown state="disabled" condition={""} title={"PM"}></DropDown>
              <DropDown
                state="disabled"
                condition={"시"}
                title={"12"}
              ></DropDown>
              <DropDown
                state="disabled"
                condition={"분"}
                title={"00"}
              ></DropDown>
            </div>
          )}

          <button onClick={send}>확인</button>
        </div>
      </Modal>
    </>
  );
};

export default PushNoticationPop;
