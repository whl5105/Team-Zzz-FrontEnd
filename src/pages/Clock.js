import React from "react";
import styled from "styled-components";
import DropDown from "../elements/DropDown";
import { history } from "../redux/configureStore";

// 아이콘 이미지 import
import nextIcon from "../static/images/icon/nextIcon.svg";
import sleep_background from "../static/images/sleeptime/sleep_background.svg";

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
  const [toggle, setToggle] = React.useState(true);

  const [dayActive, setDayActive] = React.useState(false);
  const [hourActive, setHourActive] = React.useState(false);
  const [minutesActive, setMinutesActive] = React.useState(false);

  const [day, setDay] = React.useState("오후"); // 오전(true), 오후(false) 설정
  const [hour, setHour] = React.useState(12); // 시 설정
  const [minutes, setMinutes] = React.useState("00"); // 분 설정
  // const [hours, setHours] = React.useState(arr);

  const dayItems = ["오전", "오후"];
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
    setToggle(false);
    const date = day;
    const hours = hour / 1;
    const minute = minutes / 1;

    if (date === "오후") {
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
          setampm("PM");
          setwakeup_hour(restime1);
        } else {
          setampm("PM");
          restime1 -= 12;
          setwakeup_hour(restime1);
        }
      } else {
        setampm("AM");
        setwakeup_hour(restime1);
      }

      let restime2 = res2.getHours();
      setwakeup_hour2(res2.getHours());
      setwakeup_min2(res2.getMinutes());
      if (restime2 >= 12) {
        if (restime2 === 12) {
          setampm2("PM");
          setwakeup_hour2(restime2);
        } else {
          setampm2("PM");
          restime2 -= 12;
          setwakeup_hour2(restime2);
        }
      } else {
        setampm2("AM");
        setwakeup_hour2(restime2);
      }

      let restime3 = res3.getHours();
      setwakeup_hour3(res3.getHours());
      setwakeup_min3(res3.getMinutes());
      if (restime3 >= 12) {
        if (restime3 === 12) {
          setampm3("PM");
          setwakeup_hour3(restime3);
        } else {
          setampm3("PM");
          restime3 -= 12;
          setwakeup_hour3(restime3);
        }
      } else {
        setampm3("AM");
        setwakeup_hour3(restime3);
      }

      let restime4 = res4.getHours();
      setwakeup_hour4(res4.getHours());
      setwakeup_min4(res4.getMinutes());
      if (restime4 >= 12) {
        if (restime4 === 12) {
          setampm4("PM");
          setwakeup_hour4(restime4);
        } else {
          setampm4("PM");
          restime4 -= 12;
          setwakeup_hour4(restime4);
        }
      } else {
        setampm4("AM");
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
        setampm("PM");
        restime1 -= 12;
        setwakeup_hour(restime1);
      } else {
        setampm("AM");
        setwakeup_hour(restime1);
      }

      let restime2 = res2.getHours();
      setwakeup_hour2(res2.getHours());
      setwakeup_min2(res2.getMinutes());
      if (restime2 >= 12) {
        setampm2("PM");
        restime2 -= 12;
        setwakeup_hour2(restime2);
      } else {
        setampm2("AM");
        setwakeup_hour2(restime2);
      }

      let restime3 = res3.getHours();
      setwakeup_hour3(res3.getHours());
      setwakeup_min3(res3.getMinutes());
      if (restime3 >= 12) {
        setampm3("PM");
        restime3 -= 12;
        setwakeup_hour3(restime3);
      } else {
        setampm3("AM");
        setwakeup_hour3(restime3);
      }

      let restime4 = res4.getHours();
      setwakeup_hour4(res4.getHours());
      setwakeup_min4(res4.getMinutes());
      if (restime4 >= 12) {
        setampm4("PM");
        restime4 -= 12;
        setwakeup_hour4(restime4);
      } else {
        setampm4("AM");
        setwakeup_hour4(restime4);
      }
    }
  }
  return (
    <>
      <Background categoryImage={sleep_background}>
        <ArrowIcon
          categoryImage={nextIcon}
          onClick={() => {
            history.push("/");
          }}
        ></ArrowIcon>
        {toggle ? (
          <Content>나에게 가장 적절한 수면시간을 찾아볼까요?</Content>
        ) : (
          <Content>나에게 적절한 수면 시간은...</Content>
        )}
        {toggle ? (
          <SleepTimeWrap
            style={{
              height: "229px",
            }}
          >
            <WrapInside>
              <div style={{ textAlign: "center", width: "295px" }}>
                <Title>평소 일어나는 시간을 입력해주세요</Title>
              </div>
            </WrapInside>
            <div
              style={{
                position: "absolute",
                width: "295px",
                height: "30px",
                left: "20px",
                top: "67px",
              }}
            ></div>

            <SelectTimeWrap>
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
            </SelectTimeWrap>

            <Button onClick={search}>
              <p
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px",
                  position: "absolute",
                  width: "60px",
                  height: "20px",
                  left: "calc(50%-26px/2 + 1px)",
                  top: "calc(50% - 20px/2)",
                }}
              >
                입력 완료
              </p>
            </Button>
          </SleepTimeWrap>
        ) : (
          <>
            <SleepTimeWrap>
              <WrapInside>
                <div style={{ textAlign: "center", width: "295px" }}>
                  <Title>아래 시간 중 선택해서 잠드는게 좋아요!</Title>
                </div>
              </WrapInside>
              <div
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  position: "absolute",
                  width: "295px",
                  height: "48px",
                  left: "20px",
                  top: "50px",
                  zIndex: "1",
                  margin: "0px",
                }}
              >
                <div style={{ textAlign: "center", margin: "15px 0px" }}>
                  <BestSleepTime>{`${wakeup_hour}:${
                    wakeup_min < 10 ? "0" + wakeup_min : wakeup_min
                  } ${ampm}`}</BestSleepTime>
                  <span
                    style={{
                      color: "white",
                      fontSize: "15px",
                      width: "15px",
                      height: "15px",
                      margin: "0px 9px",
                      letterSpacing: "-0.3px",
                    }}
                  >{`or`}</span>
                  <BestSleepTime>{`${wakeup_hour2}:${
                    wakeup_min2 < 10 ? "0" + wakeup_min2 : wakeup_min2
                  } ${ampm2}`}</BestSleepTime>
                </div>
                <div style={{ textAlign: "center" }}>
                  <BestSleepTime>{`${wakeup_hour3}:${
                    wakeup_min3 < 10 ? "0" + wakeup_min3 : wakeup_min3
                  } ${ampm3}`}</BestSleepTime>
                  <span
                    style={{
                      color: "white",
                      fontSize: "15px",
                      width: "15px",
                      height: "15px",
                      margin: "0px 9px",
                      letterSpacing: "-0.3px",
                    }}
                  >{`or`}</span>
                  <BestSleepTime>{`${wakeup_hour4}:${
                    wakeup_min4 < 10 ? "0" + wakeup_min4 : wakeup_min4
                  } ${ampm4}`}</BestSleepTime>
                </div>
              </div>
            </SleepTimeWrap>

            <div
              style={{
                textAlign: "center",
                width: "100%",
                position: "absolute",
                top: "551px",
              }}
            >
              <Title
                style={{
                  fontWeight: "normal",
                  fontSize: "12px",
                  color: "#C4C4C4",
                }}
              >
                제시된 시간에 따라 알맞는 수면 시간을 찾아보세요.
              </Title>
            </div>
          </>
        )}
      </Background>
    </>
  );
};

const Background = styled.div`
  position: relative;
  top: -50px;
  left: 0px;
  width: 375px;
  height: 812px;

  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  position: static;
  line-height: 27px;
  letter-spacing: -0.3px;
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

const SleepTimeWrap = styled.div`
  flex-direction: row;
  align-items: flex-start;

  position: absolute;
  width: 335px;
  height: 177px;
  left: 20px;
  top: 354px;
  background: rgba(248, 248, 248, 0.1);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  z-index: 1;
`;

const WrapInside = styled.div`
  display: flex;
  flex-direction: clumn;
  align-items: flex-start;
  position: absolute;
  width: 295px;
  height: 27px;
  left: 20px;
  top: 20px;
`;

const BestSleepTime = styled.span`
  color: #feecc3;
  font-size: 24px;
  width: 106px;
  height: 3px;
  font-weight: bold;
`;

const SelectTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  position: absolute;
  width: 295px;
  height: 48px;
  left: 20px;
  top: 50px;
  z-index: 1;
`;

const Content = styled.p`
  position: absolute;
  width: 165px;
  height: 99px;
  left: 105px;
  top: 177px;
  font-size: 22px;
  line-height: 33px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  letter-spacing: -0.3px;
`;

const ArrowIcon = styled.div`
  position: absolute;
  top: 74px;
  left: 20px;
  width: 30px;
  height: 30px;
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  background-size: cover;
  /* margin: 2px 0px; */
  transform: rotate(-180deg);
  cursor: pointer;
`;

export default Clock;
