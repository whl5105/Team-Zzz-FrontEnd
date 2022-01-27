import React from "react";
import styled from "styled-components";

import { web_back, web_logo, web_phone } from "../../static/images/index";

const Background = () => {
  return (
    <Bg>
      <Bg1 src={web_back} alt="background" />
      <Bg2 src={web_phone} alt="background" />
      <Logo src={web_logo} alt="background" />
    </Bg>
  );
};

const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow: hidden;

  @media (max-width: 500px) {
    display:none;
  }
  
  & img {
    position: absolute;
    cursor: default;
    
`;

const Bg1 = styled.img`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const Bg2 = styled.img`
  width: 100%;
  left: 0;
  bottom: -100px;
`;

const Logo = styled.img`
  width: 300px;
  top: 30%;
  left: 17%;
`;

export default Background;
