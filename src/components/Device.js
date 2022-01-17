import React from "react";
import styled from "styled-components";

const Device = () => {
  return (
    <WebBackgroundWrapper>
      <ClayPhone>
        {/* <WebViewLayout ref={webViewWrapper}>{children}</WebViewLayout> */}
      </ClayPhone>
    </WebBackgroundWrapper>
  );
};
const WebBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  @media screen and (min-width: 1120px) {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;
const ClayPhone = styled.div`
  width: 387px;
  height: 739px;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  @media screen and (min-width: 1120px) {
    right: 10%;
    top: 50%;
    transform: translateX(0%);
    transform: translateY(-50%);
  }
`;

export default Device;
