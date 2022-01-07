// 푸시 알림 팝업 페이지
import React from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as noticeActions } from "../redux/modules/notice";
import DropDown from "../elements/DropDown";
import Toggle from "../elements/Toggle";

const MyPageNotification = (props) => {
  const notices = useSelector((state) => state.notice.time.sleepChk);
  const days = useSelector((state) => state.notice.time.timePA);
  const hours = useSelector((state) => state.notice.time.hour);
  const minute = useSelector((state) => state.notice.time.min);

  // const [modal, setModal] = React.useState(true); // 모달창
  const [notice, setNotice] = React.useState(notices); // 알림 유무
  const [day, setDay] = React.useState(days); // 오전("AM"), 오후("PM") 설정
  const [hour, setHour] = React.useState(hours); // 시 설정
  const [minutes, setMinutes] = React.useState(minute); // 분 설정
  const userIdx = props.match.params.userIdx;

  const [dayActive, setDayActive] = React.useState(false);
  const [hourActive, setHourActive] = React.useState(false);
  const [minutesActive, setMinutesActive] = React.useState(false);

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

  const history = useHistory();
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  console.log(label);
  const send = () => {
    if (!notice) {
      // 알림 안받는 경우 → 미들웨어에 기본값을 설정 해줘야 합니다.
      dispatch(noticeActions.noticeDB(notice));
    } else {
      dispatch(noticeActions.noticeDB(notice, day, hour, minutes));
    }
  };

  return (
    <>
      <p
        style={{
          position: "absolute",
          width: "120px",
          height: "22px",
          left: "20px",
          top: "70px",
          fontSize: "22px",
          lineHeight: "100%",
          color: "white",
          margin: "0px",
        }}
      >
        알림 편집
      </p>
      <NoticeBox>
        <div
          style={{
            //   width:"500px",
            position: "absolute",
            width: "335px",
            height: "253px",
            left: "20px",
            top: "122px",
            margin: "auto",
            background: "rgba(248,248,248,0.1)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            outline: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",

              position: "absolute",
              width: "295px",
              height: "27px",
              left: "20px",
              top: "20px",
            }}
          >
            <Title>매일 알림 받고 기록하기</Title>
          </div>
          <div
            style={{
              position: "absolute",
              width: "295px",
              height: "30px",
              left: "20px",
              top: "67px",
            }}
          >
            <ToggleSwitch>
              <p
                style={{
                  padding: "5px 0px 0px 0px",
                }}
              >
                수면 기록 알림 받기
              </p>
              <div
                style={{
                  position: "absolute",
                  left: "242px",
                }}
              >
                <Toggle
                  notice={notice}
                  setNotice={setNotice}
                  label=" "
                ></Toggle>
              </div>
            </ToggleSwitch>
          </div>
          <div>
            {notice ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    position: "absolute",
                    width: "295px",
                    height: "48px",
                    left: "20px",
                    top: "100px",
                    zIndex: "1",
                  }}
                >
                  <div
                    style={{
                      marginRight: "8px",
                    }}
                  >
                    <DropDown
                      dayActive={dayActive}
                      setDayActive={setDayActive}
                      setHourActive={setHourActive}
                      setMinutesActive={setMinutesActive}
                      condition={""}
                      title={day}
                      dayItems={dayItems}
                      state={setDay}
                    ></DropDown>
                  </div>
                  <div
                    style={{
                      marginRight: "8px",
                    }}
                  >
                    <DropDown
                      hourActive={hourActive}
                      setDayActive={setDayActive}
                      setHourActive={setHourActive}
                      setMinutesActive={setMinutesActive}
                      condition={"시"}
                      title={hour}
                      hourItems={hourItems}
                      state={setHour}
                    ></DropDown>
                  </div>
                  <DropDown
                    minutesActive={minutesActive}
                    setDayActive={setDayActive}
                    setHourActive={setHourActive}
                    setMinutesActive={setMinutesActive}
                    condition={"분"}
                    title={minutes}
                    minutesItems={minutesItems}
                    state={setMinutes}
                  ></DropDown>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  position: "absolute",
                  width: "295px",
                  height: "48px",
                  left: "20px",
                  top: "100px",
                }}
              >
                <div
                  style={{
                    marginRight: "8px",
                  }}
                >
                  <DropDown
                    state="disabled"
                    condition={""}
                    title={day}
                  ></DropDown>
                </div>
                <div
                  style={{
                    marginRight: "8px",
                  }}
                >
                  <DropDown
                    state="disabled"
                    condition={"시"}
                    title={hour}
                  ></DropDown>
                </div>
                <DropDown
                  state="disabled"
                  condition={"분"}
                  title={minutes}
                ></DropDown>
              </div>
            )}
          </div>

          <Button onClick={send}>
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                position: "absolute",
                width: "40px",
                height: "20px",
                left: "calc(50%-26px/2 + 1px)",
                top: "calc(50% - 20px/2)",
              }}
            >
              확인
            </p>
          </Button>
        </div>
      </NoticeBox>
    </>
  );
};

const Title = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  position: static;
  line-height: 27px;
  letter-spacing: -0.3px;
  vertical-align: top;
  text-align: left;
`;

const ToggleSwitch = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  letter-spacing: -0.3px;
  display: flex;
  position: absolute;
  width: 300px;
  height: 30px;
`;

const NoticeBox = styled.div``;
const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  flex: none;
  order: 0;
  flex-grow: 0;

  position: absolute;
  width: 295px;
  height: 48px;
  border: none;
  border-radius: 8px;
  left: 20px;
  top: 185px;
  background-color: ${({ theme }) => theme.colors.main_1};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

export default MyPageNotification;
