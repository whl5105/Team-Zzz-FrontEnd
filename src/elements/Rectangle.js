import React from "react";
import styled from "styled-components";
import DiaryAvg from "../static/images/diary/DiaryAvg.png";

const Rectangle = (props) => {
  return (
    <TextBox>
      <Text>{props.text}</Text>
      <img src={DiaryAvg} alt="avg" style={{ width: "100%" }}></img>
    </TextBox>
  );
};

const TextBox = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  padding: 0px 20px;
  margin: 10px 0px;
  bottom: 60px;
  box-sizing: border-box;

  @media (max-width: 500px) {
    bottom: 80px;
  }
`;

const Text = styled.p`
  position: absolute;
  bottom: 6px;
  transform: translateY(-50%);
  margin-left: 5%;
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  line-height: ${({ theme }) => theme.lineHeight.xxl};
  letter-spacing: -0.3px;

  @media (max-width: 500px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    bottom: -3px;
  }

  @media (max-width: 450px) {
    font-size: ${({ theme }) => theme.fontSizes.small};
    bottom: 5px;
  }

  @media (max-width: 400px) {
    font-size: ${({ theme }) => theme.fontSizes.small};
    bottom: 8px;
  }

  @media (max-width: 350px) {
    font-size: ${({ theme }) => theme.fontSizes.small};
    bottom: 10px;
  }
`;

export default Rectangle;
