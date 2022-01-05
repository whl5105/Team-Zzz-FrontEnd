import React from "react";
import styled from "styled-components";

import DropDown from "../elements/DropDown";
import Toggle from "../elements/Toggle";

const Clock = (props) => {
  const [ampm, setampm] = React.useState("");
  const [wakeup_hour, setwakeup_hour] = React.useState(0);
  const [wakeup_min, setwakeup_min] = React.useState(0);
  const [ampm2, setampm2] = React.useState("");
  const [wakeup_hour2, setwakeup_hour2] = React.useState(0);
  const [wakeup_min2, setwakeup_min2] = React.useState(0);
  const [ampm3, setampm3] = React.useState("");
  const [wakeup_hour3, setwakeup_hour3] = React.useState(0);
  const [wakeup_min3, setwakeup_min3] = React.useState(0);
  const [ampm4, setampm4] = React.useState("");
  const [wakeup_hour4, setwakeup_hour4] = React.useState(0);
  const [wakeup_min4, setwakeup_min4] = React.useState(0);
  const arr = new Array(12).fill("");

  const [dayActive, setDayActive] = React.useState(false);
  const [hourActive, setHourActive] = React.useState(false);
  const [minutesActive, setMinutesActive] = React.useState(false);

  const [day, setDay] = React.useState("PM"); // 오전(true), 오후(false) 설정
  const [hour, setHour] = React.useState(12); // 시 설정
  const [minutes, setMinutes] = React.useState("00"); // 분 설정
  // const [hours, setHours] = React.useState(arr);

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

  function search() {
    const date = day;
    const hours = hour / 1;
    const minute = minutes / 1;

    if (date === "PM") {
      let setTime = new Date(2021, 11, 27, hours + 12, minute);
      // setTime.setMinutes(0);
      console.log(setTime);
      let res4 = new Date(setTime.getTime() - 270 * 60000);
      let res3 = new Date(res4.getTime() - 90 * 60000);
      let res2 = new Date(res3.getTime() - 90 * 60000);
      let res1 = new Date(res2.getTime() - 90 * 60000);

      let restime1 = res1.getHours();
      setwakeup_hour(res1.getHours());
      setwakeup_min(res1.getMinutes());
      if (restime1 >= 12) {
        if (restime1 === 12) {
          setampm("오후");
          setwakeup_hour(restime1);
        } else {
          setampm("오후");
          restime1 -= 12;
          setwakeup_hour(restime1);
        }
      } else {
        setampm("오전");
        setwakeup_hour(restime1);
      }

      let restime2 = res2.getHours();
      setwakeup_hour2(res2.getHours());
      setwakeup_min2(res2.getMinutes());
      if (restime2 >= 12) {
        if (restime2 === 12) {
          setampm2("오후");
          setwakeup_hour2(restime2);
        } else {
          setampm2("오후");
          restime2 -= 12;
          setwakeup_hour2(restime2);
        }
      } else {
        setampm2("오전");
        setwakeup_hour2(restime2);
      }

      let restime3 = res3.getHours();
      setwakeup_hour3(res3.getHours());
      setwakeup_min3(res3.getMinutes());
      if (restime3 >= 12) {
        if (restime3 === 12) {
          setampm3("오후");
          setwakeup_hour3(restime3);
        } else {
          setampm3("오후");
          restime3 -= 12;
          setwakeup_hour3(restime3);
        }
      } else {
        setampm3("오전");
        setwakeup_hour3(restime3);
      }

      let restime4 = res4.getHours();
      setwakeup_hour4(res4.getHours());
      setwakeup_min4(res4.getMinutes());
      if (restime4 >= 12) {
        if (restime4 === 12) {
          setampm4("오후");
          setwakeup_hour4(restime4);
        } else {
          setampm4("오후");
          restime4 -= 12;
          setwakeup_hour4(restime4);
        }
      } else {
        setampm4("오전");
        setwakeup_hour4(restime4);
      }
    } else {
      var setTime = new Date(2021, 11, 27, hour, minute);

      let res4 = new Date(setTime.getTime() - 270 * 60000);
      let res3 = new Date(res4.getTime() - 90 * 60000);
      let res2 = new Date(res3.getTime() - 90 * 60000);
      let res1 = new Date(res2.getTime() - 90 * 60000);

      let restime1 = res1.getHours();
      setwakeup_hour(res1.getHours());
      setwakeup_min(res1.getMinutes());
      if (restime1 >= 12) {
        setampm("오후");
        restime1 -= 12;
        setwakeup_hour(restime1);
      } else {
        setampm("오전");
        setwakeup_hour(restime1);
      }

      let restime2 = res2.getHours();
      setwakeup_hour2(res2.getHours());
      setwakeup_min2(res2.getMinutes());
      if (restime2 >= 12) {
        setampm2("오후");
        restime2 -= 12;
        setwakeup_hour2(restime2);
      } else {
        setampm2("오전");
        setwakeup_hour2(restime2);
      }

      let restime3 = res3.getHours();
      setwakeup_hour3(res3.getHours());
      setwakeup_min3(res3.getMinutes());
      if (restime3 >= 12) {
        setampm3("오후");
        restime3 -= 12;
        setwakeup_hour3(restime3);
      } else {
        setampm3("오전");
        setwakeup_hour3(restime3);
      }

      let restime4 = res4.getHours();
      setwakeup_hour4(res4.getHours());
      setwakeup_min4(res4.getMinutes());
      if (restime4 >= 12) {
        setampm4("오후");
        restime4 -= 12;
        setwakeup_hour4(restime4);
      } else {
        setampm4("오전");
        setwakeup_hour4(restime4);
      }
    }
  }
  return (
    <>
      <p
        style={{
          position: "absolute",
          width: "165px",
          height: "99px",
          left: "105px",
          top: "127px",
          fontSize: "22px",
          lineHeight: "33px",
          color: "white",
          margin: "0px",
          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: "-0.3px",
        }}
      >
        나에게 가장 적절한 수면시간을 찾아볼까요?
      </p>
      <div
        style={{
          //   width:"500px",
          position: "absolute",
          width: "335px",
          height: "229px",
          left: "20px",
          top: "354px",
          margin: "auto",
          background: "rgba(248,248,248,0.1)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          // overflow: "auto",
          // WebkitOverflowScrolling: "touch",
          borderRadius: "12px",
          outline: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "clumn",
            alignItems: "flex-start",
            padding: "0px",

            position: "absolute",
            width: "295px",
            height: "27px",
            left: "20px",
            top: "20px",
          }}
        >
          <Title>평소 일어나는 시간을 입력해주세요</Title>
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
          {/* <ToggleSwitch>
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
            <Toggle notice={notice} setNotice={setNotice} label=" "></Toggle>
          </div>
        </ToggleSwitch> */}
        </div>
        <div>
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: "0px",
                position: "absolute",
                width: "295px",
                height: "48px",
                left: "20px",
                top: "50px",
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
        </div>

        <Button onClick={search}>
          <p
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px",
              position: "absolute",
              width: "26px",
              height: "20px",
              left: "calc(50%-26px/2 + 1px)",
              top: "calc(50% - 20px/2)",
            }}
          >
            확인
          </p>
        </Button>
      </div>
      <span
        style={{ margin: "5px", color: "white" }}
      >{`${ampm}  ${wakeup_hour}시 ${wakeup_min}분`}</span>
      <span
        style={{ margin: "5px", color: "white" }}
      >{`${ampm2}  ${wakeup_hour2}시 ${wakeup_min2}분`}</span>
      <span
        style={{ margin: "5px", color: "white" }}
      >{`${ampm3}  ${wakeup_hour3}시 ${wakeup_min3}분`}</span>
      <span
        style={{ margin: "5px", color: "white" }}
      >{`${ampm4}  ${wakeup_hour4}시 ${wakeup_min4}분`}</span>
    </>
  );
};

const Title = styled.p`
  /* position: absolute;
  left:0px;
  top:0px; */

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  position: static;
  line-height: 27px;
  letter-spacing: -0.3px;
  vertical-align: top;
  text-align: left;
`;

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
  top: 150px;
  background-color: ${({ theme }) => theme.colors.main_1};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

export default Clock;
