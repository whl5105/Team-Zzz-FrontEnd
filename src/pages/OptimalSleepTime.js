import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import { Button, Icon, DropDown } from "../elements/index";

import {
  arrow_R_W,
  sleepTime_B,
  sleepTime_T_C,
  sleepTime_T_L,
  sleepTime_T_R,
  fallBack,
} from "../static/images";

const OptimalSleepTime = (props) => {
  const [ampm, setampm] = useState("");
  const [wakeup_hour, setwakeup_hour] = useState(0);
  const [wakeup_min, setwakeup_min] = useState(0);
  const [ampm2, setampm2] = useState("");
  const [wakeup_hour2, setwakeup_hour2] = useState(0);
  const [wakeup_min2, setwakeup_min2] = useState(0);
  const [ampm3, setampm3] = useState("");
  const [wakeup_hour3, setwakeup_hour3] = useState(0);
  const [wakeup_min3, setwakeup_min3] = useState(0);
  const [ampm4, setampm4] = useState("");
  const [wakeup_hour4, setwakeup_hour4] = useState(0);
  const [wakeup_min4, setwakeup_min4] = useState(0);
  const [toggle, setToggle] = useState(true);

  const [dayActive, setDayActive] = useState(false);
  const [hourActive, setHourActive] = useState(false);
  const [minutesActive, setMinutesActive] = useState(false);

  const [day, setDay] = useState("오후");
  const [hour, setHour] = useState(12);
  const [minutes, setMinutes] = useState("00");

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
      let setTime = new Date(2021, 11, 27, hour, minute);

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

  const resultReset = () => {
    setToggle(true);
  };
  return (
    <>
      <Background>
        <Icon
          src={arrow_R_W}
          top="104px"
          left="20px"
          rotate="-180deg"
          position="absolute"
          _onClick={() => {
            history.push("/");
          }}
        ></Icon>
        <Content>
          {toggle ? (
            <SleepTimeWrap>
              <WrapInside>
                <div style={{ textAlign: "center" }}>
                  <Title>평소 일어나는 시간을 입력해주세요</Title>
                </div>
              </WrapInside>

              <SelectTimeWrap>
                <MarginRight>
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
                </MarginRight>
                <MarginRight>
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
                </MarginRight>
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

              <Button _onClick={search} text="입력 완료" marginT="30">
                입력 완료
              </Button>
            </SleepTimeWrap>
          ) : (
            <div>
              <SleepTimeWrap>
                <WrapInside>
                  <Title>아래 시간 중 선택해서 잠드는게 좋아요!</Title>
                </WrapInside>
                <Time marginB="15px">
                  <BestSleepTime>{`${wakeup_hour}:${
                    wakeup_min < 10 ? "0" + wakeup_min : wakeup_min
                  } ${ampm}`}</BestSleepTime>
                  <Or>{`or`}</Or>
                  <BestSleepTime>{`${wakeup_hour2}:${
                    wakeup_min2 < 10 ? "0" + wakeup_min2 : wakeup_min2
                  } ${ampm2}`}</BestSleepTime>
                </Time>
                <Time>
                  <BestSleepTime>{`${wakeup_hour3}:${
                    wakeup_min3 < 10 ? "0" + wakeup_min3 : wakeup_min3
                  } ${ampm3}`}</BestSleepTime>
                  <Or>{`or`}</Or>
                  <BestSleepTime>{`${wakeup_hour4}:${
                    wakeup_min4 < 10 ? "0" + wakeup_min4 : wakeup_min4
                  } ${ampm4}`}</BestSleepTime>
                </Time>
                <Reset>
                  <Icon
                    _onClick={resultReset}
                    src={fallBack}
                    width="24px"
                    height="24px"
                    alt=""
                    padding="3px 4px"
                  ></Icon>
                </Reset>
              </SleepTimeWrap>

              <Explanation>
                제시된 시간에 따라 알맞는 수면 시간을 찾아보세요.
              </Explanation>
            </div>
          )}
        </Content>
      </Background>
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: inherit;

  background: url(${sleepTime_T_L}), url(${sleepTime_T_C}),
    url(${sleepTime_T_R}), url(${sleepTime_B});
  background-size: 420px, 310px, 420px, 282px;
  background-position: 0% 0%, 50% 3%, 100% 0%, 50% 108%;
  background-repeat: no-repeat;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  position: static;
  height: 30px;
  letter-spacing: -0.3px;
  text-align: center;
`;

const Explanation = styled.p`
  width: 100%;
  height: 30px;
  letter-spacing: -0.3px;
  text-align: center;

  position: relative;
  top: 20px;

  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  color: ${({ theme }) => theme.colors.gray_5};
`;

const SleepTimeWrap = styled.div`
  width: 100%;
  background: rgba(248, 248, 248, 0.1);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
`;

const WrapInside = styled.div`
  height: 33px;
  margin-bottom: 20px;
`;

const BestSleepTime = styled.span`
  width: 106px;
  height: 3px;

  color: ${({ theme }) => theme.colors.main_5};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  font-family: "Roboto", sans-serif;
`;

const SelectTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const MarginRight = styled.div`
  margin-right: 8px;
`;

const Content = styled.div`
  padding: 0 20px;
  width: 100%;
  position: absolute;
  top: 56%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
`;

const Time = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.marinB && props.marginB};
`;

const Or = styled.span`
  width: 15px;
  height: 15px;
  margin: 0px 9px;
  letter-spacing: -0.3px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Reset = styled.div`
  text-align: center;
  margin-top: 24px;
`;

export default OptimalSleepTime;
