import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../elements";

import alarmBanner from "../../static/images/mypage/alarmBanner.png";
import path from "../../static/images/mypage/path_black.png";

const AlarmBanner = (props) => {
  const { _onClick } = props;
  const userNotice = useSelector((state) => state.notice);
  return (
    <AlarmBox>
      <Alarm onClick={_onClick}>
        <p>알림</p>
        <TimeList>
          <Time>
            {userNotice.time.sleepChk === false && "알림 OFF"}
            {userNotice.time.sleepChk
              ? userNotice.time.timePA === "AM"
                ? "오전"
                : "오후"
              : null}{" "}
            &nbsp;
            <span>
              {userNotice.time.sleepChk ? userNotice.time.hour : null}
              {userNotice.time.sleepChk ? `:` : null}
              {userNotice.time.sleepChk
                ? userNotice.time.min < 10
                  ? "0" + userNotice.time.min
                  : userNotice.time.min
                : null}
            </span>
          </Time>
          <Icon src={path}></Icon>
        </TimeList>
      </Alarm>
    </AlarmBox>
  );
};
AlarmBanner.defaultProps = {
  _onClick: () => {},
};
const AlarmBox = styled.div`
  padding: ${({ theme }) => theme.paddings.xxxxl};
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
`;
const Alarm = styled.div`
  width: 100%;
  background-image: url(${alarmBanner});
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  border-radius: 12px;

  color: white;
  & p {
    font-weight: ${({ theme }) => theme.fontWeight.Medium};
    font-size: 14px;
    padding-bottom: 5px;
  }
`;
const TimeList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Time = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  font-size: 26px;
  & span {
    font-family: "Roboto";
  }
`;

export default AlarmBanner;
