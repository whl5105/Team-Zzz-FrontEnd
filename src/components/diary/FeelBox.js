import React, { useState } from "react";
import styled from "styled-components";

import Charater from "../../elements/Charater";

const FeelBox = (props) => {
  const { previewFeel, edit, _onClick, feelNumber } = props;
  const [arr, setArr] = useState([
    { text: "찌뿌등", score: 1, color: "#6CA8FF" },
    { text: "피곤", score: 3, color: "#90D3CC" },
    { text: "개운", score: 5, color: "#FCD371" },
    { text: "상쾌", score: 4, color: "#EE8BA7" },
    { text: "몽롱", score: 2, color: "#C793DC" },
  ]);

  return (
    <Container>
      <h3>자고 일어난후 느낌</h3>
      {edit ? (
        <Feel>
          {arr.map((arr, idx) => {
            return (
              <FleepItem key={idx}>
                <Charater
                  shape="feel"
                  size="35"
                  score={arr.score}
                  feelNumber={idx + 1}
                  scoreColor="#c4c4c4"
                  _onClick={_onClick}
                  is_click={previewFeel === idx + 1 ? true : false}
                  text={arr.text}
                />
              </FleepItem>
            );
          })}
        </Feel>
      ) : (
        <Feel>
          {arr.map((arr, idx) => {
            return (
              <FleepItem key={idx}>
                <Charater
                  shape="feel"
                  size="35"
                  score={arr.score}
                  feelNumber={idx + 1}
                  display={feelNumber}
                  scoreColor="#c4c4c4"
                  is_click={previewFeel === idx + 1 ? true : false}
                  text={arr.text}
                />
              </FleepItem>
            );
          })}
        </Feel>
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

  & h3 {
    padding-bottom: 15px;
  }
`;

const Feel = styled.div`
  height: 74px;
  padding-bottom: ${({ theme }) => theme.paddings.xxxxl};
  display: flex;
  align-items: flex-end;
  text-align: center;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_3};
`;

const FleepItem = styled.div`
  width: 20%;
`;

export default FeelBox;
