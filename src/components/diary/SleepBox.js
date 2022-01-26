import React, { useState } from "react";
import styled from "styled-components";

import { Charater } from "../../elements/index";

const SleepBox = (props) => {
  const { previewSleep, edit, _onClick } = props;
  const [arr, setArr] = useState([
    { text: "결핍", score: 1, color: "#6CA8FF" },
    { text: "부족", score: 3, color: "#90D3CC" },
    { text: "적당", score: 5, color: "#FCD371" },
    { text: "충분", score: 4, color: "#EE8BA7" },
    { text: "과다", score: 2, color: "#C793DC" },
  ]);

  return (
    <Container>
      <h3>수면 시간</h3>
      {edit ? (
        <Sleep>
          {arr.map((arr, idx) => {
            return (
              <SleepItem key={idx}>
                <Charater
                  shape="sleep"
                  size="20"
                  score={arr.score}
                  bgcolor={arr.color}
                  sleepNumber={idx + 1}
                  _onClick={_onClick}
                  is_click={previewSleep === idx + 1 ? true : false}
                  text={arr.text}
                />
              </SleepItem>
            );
          })}
        </Sleep>
      ) : (
        <Sleep>
          {arr.map((arr, idx) => {
            return (
              <SleepItem key={idx}>
                <Charater
                  shape="sleep"
                  size="20"
                  score={arr.score}
                  selectColor={arr.color}
                  sleepNumber={idx + 1}
                  is_click={previewSleep === idx + 1 ? true : false}
                  text={arr.text}
                />
              </SleepItem>
            );
          })}
        </Sleep>
      )}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeight.small};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  color: ${({ theme }) => theme.colors.gray_7};
  padding-top: ${({ theme }) => theme.paddings.xxxxl};

  & h3 {
    padding-bottom: 15px;
  }
`;

const Sleep = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 74px;
`;

const SleepItem = styled.div`
  width: 20%;
`;

export default SleepBox;
