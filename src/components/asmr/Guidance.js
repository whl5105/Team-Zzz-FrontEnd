import React from "react";
import styled from "styled-components";

import { notSupported } from "../../static/images/index";

const Guidance = (props) => {
  const { left } = props;

  return <GuidanceBtn src={notSupported} left={left} />;
};

const GuidanceBtn = styled.div`
  width: 120px;
  height: 35px;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;

  position: absolute;
  bottom: -10px;
  left: ${(props) => props.left + 2}px;
  transform: translateX(-50%);
  opacity: 0;
  z-index: 200;
  animation: Guidance 2s ease-in-out alternate;

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
