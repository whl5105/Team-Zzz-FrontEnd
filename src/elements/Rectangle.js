import React from "react";
import styled from "styled-components";
import DiaryAvg from "../static/images/diary/DiaryAvg.png";

const Rectangle = (props) => {
  console.log(props.top)
  return (
    <div style={{ position: "relative", margin: "0px 20px", top: `${props.top}` }}>
      <Text>{props.text}</Text>
      <img src={DiaryAvg} alt="avg"></img>
    </div>
  );
};

const Text = styled.p`
  position: absolute;
  top: 48%;
  margin-left: 5%;
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  line-height: ${({ theme }) => theme.lineHeight.xxl};
  letter-spacing: -0.3px;
`;

export default Rectangle;
