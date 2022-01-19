import React from "react";
import styled from "styled-components";

// --- components ---
import Icon from "../../elements/Icon";

// --- images ---
import { arrow_R_W, arrow_L_W } from "../../static/images/index";

const DiaryDate = (props) => {
  const { setMoment, getMoment, nextMonth, sleepAvg } = props;

  return (
    <>
      <WrapBox>
        <Wrap>
          <Icon
            position="relative"
            top="15px"
            _onClick={() => {
              setMoment(getMoment.clone().subtract(1, "month"));
            }}
            src={arrow_L_W}
          />
          <YearMonth>{getMoment.format("YYYY.MM")}</YearMonth>
          {/* YYYY는 년도 MM 은 달입니다. */}
          <Icon
            position="relative"
            top="15px"
            _onClick={() => {
              setMoment(getMoment.clone().add(1, "month"));
            }}
            src={arrow_R_W}
          />
        </Wrap>
        {!nextMonth && <SleepAvgText>{sleepAvg}</SleepAvgText>}
      </WrapBox>
    </>
  );
};

// --- styled-components ---
const WrapBox = styled.div`
  margin: 0 20px;
  margin-top: 70px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.back};
`;

const Wrap = styled.div`
  text-align: center;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.white};
  line-height: ${({ theme }) => theme.lineHeight.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  display: flex;
  justify-content: center;
`;

const YearMonth = styled.span`
  width: 67px;
  height: 20px;
  margin: 17px 17px 15px 17px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
`;

const SleepAvgText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  line-height: ${({ theme }) => theme.lineHeight.small};
  vertical-align: top;
  padding-bottom: 15px;
  text-align: center;
`;

export default DiaryDate;
