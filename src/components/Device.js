import React from "react";
import styled from "styled-components";

import phoneBG from "../static/images/bg/phoneBG.png";
import main1 from "../static/images/bg/main_bg1.png";
import main3 from "../static/images/bg/main_bg3.png";

const Device = ({ children }) => {
  const handleClick = () => {};
  return (
    // <WebBackgroundWrapper>
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
  background-color: ${({ theme }) => theme.colors.bg};
`;
const WebBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${main3}), url(${main1});
  background-size: 300px 144px, cover;
  background-position: 190px 230px, 0% 100%;
  background-repeat: no-repeat;
`;
const ClayPhone = styled.div`
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
    transform: translate(0%, -50%);
  }
`;
const WebViewLayout = styled.div`
  max-width: 375px;
  height: 810px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
`;

export default Device;
