// 푸시 알림 팝업 페이지
import React from "react";
import Modal from "react-modal";
import Switch from "@mui/material/Switch";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as noticeActions } from "../redux/modules/notice";

const MyPageNotification = (props) => {
  const [modal, setModal] = React.useState(true); // 모달창
  const [notice, setNotice] = React.useState(true); // 알림 유무
  const [day, setDay] = React.useState("PM"); // 오전(true), 오후(false) 설정
  const [hour, setHour] = React.useState(12); // 시 설정
  const [minutes, setMinutes] = React.useState(0); // 분 설정
  const userIdx = props.match.params.userIdx; 
//   console.log(userIdx)

  const history = useHistory();
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Switch demo" } };
   console.log(label)
  const send = () => {
    if (!notice) {
      // 알림 안받는 경우 → 미들웨어에 기본값을 설정 해줘야 합니다.
      dispatch(noticeActions.noticePopDB(notice));
    } else {
      // 알림 받는 경우
      let _day = true;
      if(day === 'AM'){
        _day = true;
      }else{ // "PM"
        _day = false;
      }
      dispatch(noticeActions.noticePopDB(notice, _day, hour, minutes));
    }
  };

  return (
    <>
      <div style={{
        //   width:"500px",
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
          }}>
        <h1>푸쉬 알림 여부</h1>
        <p>
          수면 기록 알림을 받으시겠습니까? &nbsp;
          <Switch
            {...label}
            onClick={() => {
              setNotice(!notice);
            }}
            defaultChecked
          />
        </p>
        <div>
          {notice ? (
            <>
              <p>시간은 언제가 좋으세요?</p>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <p>매일</p>
                <select
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                  value={day}
                >
                  <option value="AM">오전</option>
                  <option value="PM">오후</option>
                </select>
                <select
                  onChange={(e) => {
                    setHour(e.target.value);
                  }}
                  value={hour}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <select
                  onChange={(e) => {
                    setMinutes(e.target.value);
                  }}
                  value={minutes}
                >
                  <option>00</option>
                  <option>05</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                  <option>35</option>
                  <option>40</option>
                  <option>45</option>
                  <option>50</option>
                  <option>55</option>
                </select>
              </div>
            </>
          ) : null}
          <button onClick={send}>확인</button>
        </div>
        </div>
    </>
  );
};

export default MyPageNotification;
