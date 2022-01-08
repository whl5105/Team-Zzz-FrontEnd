import React from "react";
import styled from "styled-components";
import DiaryAvg from "../static/images/diary/DiaryAvg.png";

const Rectangle = (props) => {
  return (
    <TextBox>
      <Text>{props.text}</Text>
      <img
        src={DiaryAvg}
        alt="avg"
        style={{ width: "100%", height: "60px" }}
      ></img>
    </TextBox>
  );
};

const TextBox = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  padding: 0px 20px;
  bottom: 80px;
  box-sizing: border-box;
  top: ${(props) => props.top};
`;

const Text = styled.p`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 5%;
  color: ${({ theme }) => theme.colors.bg};
  font-size: 80%;
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  line-height: ${({ theme }) => theme.lineHeight.xxl};
  letter-spacing: -0.3px;
`;

export default Rectangle;
