import React from "react";
import styled from "styled-components";

// --- images ---
import check from "../static/images/icon/check.png";

const Guidance = (props) => {
  const { text, alt } = props;

  return (
    <GuidanceBtn>
      <img src={check} alt={alt} />
      <p>{text}</p>
    </GuidanceBtn>
  );
};

const GuidanceBtn = styled.button`
  width: 215px;
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

export default Guidance;