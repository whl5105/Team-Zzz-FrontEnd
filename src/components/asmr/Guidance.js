import React from "react";
import styled from "styled-components";

// --- images ---
import IOS from "../../static/images/asmr/IOS.svg";

const Guidance = (props) => {
  return <GuidanceBtn src={IOS} left={props.left}/>;
};

const GuidanceBtn = styled.div`
  width: 110px;
  height: 30px;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;

  position: absolute;
  bottom: -10px;
  left: ${(props) => props.left + 2}px;
  transform: translateX(-50%);
  opacity: 0;
  z-index: 200;
  animation: Guidance 5s ease-in-out alternate;

  @keyframes Guidance {
    40% {
      bottom: 20px;
      opacity: 1;
    }
    60% {
      bottom: 20px;
      opacity: 1;
    }
  }
`;

export default Guidance;
