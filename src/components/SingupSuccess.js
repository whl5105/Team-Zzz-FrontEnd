import React from "react";
import styled from "styled-components";

const SingupSuccess = (props) => {
  return (
    <Success>
      <p>회원가입을 축하합니다!!!</p>
    </Success>
  );
};
const Success = styled.button`
  width: 100%;
  height: 80px;
  border: none;
  border-radius: 0 0 20px 20px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 4;
  animation: Success 3s linear alternate;
  @keyframes Success {
    0% {
      top: -100px;
    }
    50% {
      top: 40px;
    }
    100% {
      top: -100px;
    }
  }
`;

export default SingupSuccess;
