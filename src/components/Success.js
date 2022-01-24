import React from "react";
import styled from "styled-components";

import { check, clock } from "../static/images/index";

const Success = (props) => {
  const { text, alt, isClock } = props;

  return (
    <SuccessBtn isClock={isClock ? true : false}>
      {isClock ? (
        <img src={clock} alt={alt} width="24px" height="24px" />
      ) : (
        <img src={check} alt={alt} width="24px" height="24px" />
      )}
      <p>{text}</p>
    </SuccessBtn>
  );
};

const SuccessBtn = styled.button`
  width: ${(props) => (props.isClock ? "200px" : "235px")};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  background-color: ${({ theme }) => theme.colors.main_5};
  display: flex;
  justify-content: space-between;
  padding: 12px 17px 12px 20px;
  box-sizing: border-box;
  position: absolute;

  bottom: 63px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  z-index: 200;
  animation: Success 2s ease-in-out alternate;
  & img {
    padding-right: 10px;
  }
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
