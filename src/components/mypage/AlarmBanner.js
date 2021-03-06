import React, {useState} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Icon } from "../../elements";

import { arrow_R_B, mypage_alarm } from "../../static/images/index";


const AlarmBanner = (props) => {
  function Mobile() {
    return /iPhone|iPad/i.test(navigator.userAgent);
  }
  const [ios, setIos] = useState(Mobile());
  const { _onClick } = props;
  const userNotice = useSelector((state) => state.notice);

  return (
    <AlarmBox>
      <Alarm onClick={_onClick}>
        <p>알림</p>
        <TimeList>
          {!ios?Notification.permission === "granted" ? (
            <Time>
              {userNotice.time
                ? userNotice.time.sleepChk === false && "알림 OFF"
                : "알림 OFF"}
              {userNotice.time
                ? userNotice.time.sleepChk
                  ? userNotice.time.timePA
                  : null
                : null}
              &nbsp;
              <span>
                {userNotice.time
                  ? userNotice.time.sleepChk
                    ? `${userNotice.time.hour}:`
                    : null
                  : null}
                {userNotice.time
                  ? userNotice.time.sleepChk
                    ? userNotice.time.min < 10
                      ? "0" + userNotice.time.min
                      : userNotice.time.min
                    : null
                  : null}
              </span>
            </Time>
          ) : (
            <Time style={{ fontSize: "20px" }}>{"알림 OFF"}</Time>
          ): null}
          <Icon src={arrow_R_B} alt="arrow_R_B" />
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
  background-image: url(${mypage_alarm});
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
