// 푸시 알림 팝업 페이지
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as noticeActions } from "../redux/modules/notice";

// -- components --
import DropDown from "../elements/DropDown";
import Toggle from "../elements/Toggle";
import ModalPopUp from "../components/ModalPopUp";

const PushNoticationPop = (props) => {
  const [notice, setNotice] = React.useState(true); // 알림 유무
  const [day, setDay] = React.useState("PM"); // 오전(true), 오후(false) 설정
  const [hour, setHour] = React.useState(12); // 시 설정
  const [minutes, setMinutes] = React.useState(0); // 분 설정

  const dispatch = useDispatch();
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

  React.useEffect(() => {
    if (!notice) {
      setDayActive(false);
      setHourActive(false);
      setMinutesActive(false);
    }
  }, [notice]);

  // -- jsx --
  return (
    <>
      <ModalPopUp>
        <Wrap>
          <Title>매일 알림 받고 기록하기</Title>
          <ToggleSwitch>
            수면 기록 알림 받기
            <Toggle notice={notice} setNotice={setNotice} label=" "></Toggle>
          </ToggleSwitch>
          <div>
            {notice ? (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
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
                <DropDown
                  state="disabled"
                  condition={""}
                  title={"PM"}
                ></DropDown>
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
          </div>

          <Button onClick={send}>확인</Button>
        </Wrap>
      </ModalPopUp>
    </>
  );
};

// --- styled-components ---
const Wrap = styled.div`
  width: 335px;
  height: 235px;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.gray_9};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  letter-spacing: -0.3px;
  vertical-align: top;
  text-align: left;
  margin-top: 20px;
  margin-left: 20px;
`;

const ToggleSwitch = styled.div`
  color: ${({ theme }) => theme.colors.gray_9};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  letter-spacing: -0.3px;
  display: flex;
  justify-content: space-between;
  width: 295px;
  height: 30px;
  margin-top: 20px;
  margin-left: 20px;
`;

const Button = styled.button`
  width: 295px;
  height: 48px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.main_1};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  box-sizing: border-box;
  margin-top: 20px;
  margin-left: 20px;
`;

export default PushNoticationPop;
