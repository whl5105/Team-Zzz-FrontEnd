import React from "react";
import styled from "styled-components";

// --- images ---
import { check } from "../static/images/index";

const Success = (props) => {
  const { text, alt } = props;

  return (
    <SuccessBtn>
      <img src={check} alt={alt} />
      <p>{text}</p>
    </SuccessBtn>
  );
};

const SuccessBtn = styled.button`
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

  bottom: 63px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  z-index: 200;
  animation: Success 2s ease-in-out alternate;
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
`;

export default Success;
