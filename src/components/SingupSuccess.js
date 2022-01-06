import React from "react";
import styled from "styled-components";

import check from "../static/images/icon/check.png";

const SingupSuccess = (props) => {
  return (
    <Success>
      <img src={check} alt="회원가입 성공" />
      <p>회원가입에 성공하였습니다</p>
    </Success>
  );
};
const Success = styled.button`
  width: 235px;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  background-color: ${({ theme }) => theme.colors.main_5};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 27px 12px 20px;
  box-sizing: border-box;
  position: absolute;

  /* top: -100px; */
  bottom: 63px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  z-index: 4;
  animation: Success 2s linear alternate;
  @keyframes Success {
    40% {
      bottom: 93px;
      opacity: 1;
    }
    60% {
      bottom: 93px;
      opacity: 1;
    }
  }
  /* @keyframes Success {
    40% {
      bottom: 93px;
      opacity: 1;
    }
    60% {
      bottom: 93px;
      opacity: 1;
    }
    100% {
      bottom: 93px;
      opacity: 0;
    }
  } */
`;

export default SingupSuccess;
