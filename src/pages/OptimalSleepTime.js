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
  const [toggle, setToggle] = useState(true);
  const [wakeup_hours, setwakeup_hours] = useState([0, 0, 0, 0]);
  const [wakeup_mins, setwakeup_mins] = useState([0, 0, 0, 0]);
  const [ampms, setampms] = useState(["", "", "", ""]);

  const [dayActive, setDayActive] = useState(false);
  const [hourActive, setHourActive] = useState(false);
  const [minutesActive, setMinutesActive] = useState(false);

  const [day, setDay] = useState("오후");
  const [hour, setHour] = useState(12);
  const [minutes, setMinutes] = useState("00");

  function search() {
    setToggle(false);
    const date = day;
    const hours = hour / 1;
    const minute = minutes / 1;

    if (date === "오후") {
      let setTime = new Date(2021, 11, 27, hours + 12, minute);
      let res = [];
      res[3] = new Date(setTime.getTime() - 270 * 60000);
      for (let i = 3; i > 0; i--) {
        res[i - 1] = new Date(res[i].getTime() - 90 * 60000);
      }
      let restime = [];
      for (let i = 0; i < 4; i++) {
        restime[i] = res[i].getHours();
        wakeup_hours[i] = res[i].getHours();
        wakeup_mins[i] = res[i].getMinutes();
        if (restime[i] >= 12) {
          if (restime[i] === 12) {
            ampms[i] = "PM";
            wakeup_hours[i] = restime[i];
          } else {
            ampms[i] = "PM";
            restime[i] -= 12;
            wakeup_hours[i] = restime[i];
          }
        } else {
          ampms[i] = "AM";
          wakeup_hours[i] = restime[i];
        }
      }
    } else {
      let setTime = new Date(2021, 11, 27, hours, minute);
      let res = [];
      res[3] = new Date(setTime.getTime() - 270 * 60000);
      for (let i = 3; i > 0; i--) {
        res[i - 1] = new Date(res[i].getTime() - 90 * 60000);
      }
      let restime = [];
      for (let i = 0; i < 4; i++) {
        restime[i] = res[i].getHours();
        wakeup_hours[i] = res[i].getHours();
        wakeup_mins[i] = res[i].getMinutes();
        if (restime[i] >= 12) {
          ampms[i] = "PM";
          restime[i] -= 12;
          wakeup_hours[i] = restime[i];
        } else {
          ampms[i] = "AM";
          wakeup_hours[i] = restime[i];
        }
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
                <Title>평소 일어나는 시간을 입력해주세요</Title>
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
                  <BestSleepTime>{`${wakeup_hours[0]}:${
                    wakeup_mins[0] < 10 ? "0" + wakeup_mins[0] : wakeup_mins[0]
                  } ${ampms[0]}`}</BestSleepTime>
                  <Or>{`or`}</Or>
                  <BestSleepTime>{`${wakeup_hours[1]}:${
                    wakeup_mins[1] < 10 ? "0" + wakeup_mins[1] : wakeup_mins[1]
                  } ${ampms[1]}`}</BestSleepTime>
                </Time>
                <Time>
                  <BestSleepTime>{`${wakeup_hours[2]}:${
                    wakeup_mins[2] < 10 ? "0" + wakeup_mins[2] : wakeup_mins[2]
                  } ${ampms[2]}`}</BestSleepTime>
                  <Or>{`or`}</Or>
                  <BestSleepTime>{`${wakeup_hours[3]}:${
                    wakeup_mins[3] < 10 ? "0" + wakeup_mins[3] : wakeup_mins[3]
                  } ${ampms[3]}`}</BestSleepTime>
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
