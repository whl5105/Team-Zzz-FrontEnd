import React from "react";
import styled from "styled-components";

import phoneBG from "../static/images/bg/phoneBG.png";
import main1 from "../static/images/bg/main_bg1.png";
import main3 from "../static/images/bg/main_bg3.png";

const Device = ({ children }) => {
  const handleClick = () => {};
  return (
    // <WebBackgroundWrapper>
    //   <button className="install-btn" type="button" onClick={handleClick}>
    //     다운받기 : 앱으로 이용 하실 수 있어요 ❤️
    //   </button>
    //   <ClayPhone>
    //     <WebViewLayout>{children}</WebViewLayout>
    //   </ClayPhone>
    // </WebBackgroundWrapper>

    <Mobile>{children}</Mobile>
  );
};
const Mobile = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  min-width: 280px;
  height: 100vh;
  overflow: hidden;
  background: red;
`;
const WebBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-size: cover;s */

  background: url(${main3}), url(${main1});
  background-size: 300px 144px, cover;
  background-position: 190px 230px, 0% 100%;
  background-repeat: no-repeat;
  /* @media screen and (min-width: 1120px) {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  } */
`;
const ClayPhone = styled.div`
  /* width: 387px;
  height: 739px; */
  width: 431px;
  height: 864px;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  background: url(${phoneBG}) no-repeat center/cover;
  @media screen and (min-width: 1120px) {
    right: 10%;
    top: 50%;
    transform: translateX(0%);
    transform: translateY(-50%);
  }
`;
const WebViewLayout = styled.div`
  max-width: 373px;
  height: 810px;
  border: 1px solid red;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;

  overflow: hidden;
`;

export default Device;
