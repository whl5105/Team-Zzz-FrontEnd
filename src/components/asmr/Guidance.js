import React from "react";
import styled from "styled-components";

// --- images ---

const Guidance = (props) => {
  return (
    <GuidanceBtn>
      IOS에서 볼륨 조절은 미지원 서비스입니다<br></br>웹 브라우저로 접속
      해주세요
    </GuidanceBtn>
  );
};

const GuidanceBtn = styled.button`
  width: 335px;
  height: 78px;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.bg}
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeight.lg};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  background-color: ${({ theme }) => theme.colors.gray_2};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: absolute;

  bottom: 63px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  z-index: 200;
  animation: Guidance 5s ease-in-out alternate;

  @keyframes Guidance {
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
