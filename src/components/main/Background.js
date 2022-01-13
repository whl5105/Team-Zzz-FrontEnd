import React from "react";
import styled from "styled-components";

// --- images ---
import bg1 from "../../static/images/bg/main_bg1.png";
import bg2 from "../../static/images/bg/main_bg2.png";
import bg3 from "../../static/images/bg/main_bg3.png";

const Background = () => {
  return (
    <Bg>
      <Bg1 src={bg1}></Bg1>
      <Bg2 src={bg2}></Bg2>
      <Logo src={bg3}></Logo>
    </Bg>
  );
};

// --- styled-components ---
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
  top: 0;
`;

const Bg2 = styled.img`
  width: 100%;
  /* position: absolute; */
  bottom: -100px;
`;

const Logo = styled.img`
  width: 300px;
  top: 30%;
  left: 17%;
`;

export default Background;
