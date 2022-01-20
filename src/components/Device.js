import React, { useState } from "react";
import styled from "styled-components";

import { useReactPWAInstall } from "react-pwa-install";
import { install_logo } from "../static/images";

import { isMobile } from "./DeviceDetector";
import { use100vh } from "react-div-100vh";

// --- images ---
import { web_phone, web_back, web_logo } from "../static/images/index";

import { Button } from "../elements";

const Device = ({ children }) => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const [support, setSupport] = React.useState(supported());
  const [installed, setInstalled] = React.useState(isInstalled());
  const [install, setInstall] = React.useState(false);
  console.log(install);
  //모바일 높이
  const height = use100vh();

  const handleClick = () => {
    pwaInstall({
      title: "Zzz 다운받기",
      logo: install_logo,

      description: "푸쉬알림 과 볼륨조절은 현재 IOS 미지원 서비스 입니다",
    })
      .then(
        () =>
          alert("App installed successfully or instructions for install shown")
        // setInstall(true)
      )
      .catch(() => alert("User opted out from installing"));
    // setInstall(true);
  };
  //support :지원여부
  //installed : 설치여부

  return isMobile ? (
    <div>
      {support && !installed ? (
        <>
          <Button _onClick={handleClick}>설치 버튼</Button>
          <Button
            _onClick={() => {
              setInstall(true);
            }}
          >
            웹으로 보기
          </Button>
        </>
      ) : (
        <Mobile style={{ height: height }}>{children}</Mobile>
      )}
    </div>
  ) : (
    <WebBackgroundWrapper>
      {supported && !isInstalled() && (
        <Button _onClick={handleClick}>설치 버튼</Button>
      )}
      <Phone>
        <WebViewLayout>{children}</WebViewLayout>
      </Phone>
    </WebBackgroundWrapper>
  );
};

const Mobile = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  min-width: 280px;
  /* height: 100vh; */
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const WebBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${web_logo}), url(${web_back});
  background-size: 300px 144px, cover;
  background-position: 190px 230px, 0% 100%;
  background-repeat: no-repeat;
`;

const Phone = styled.div`
  width: 431px;
  height: 864px;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  background: url(${web_phone}) no-repeat center/cover;

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
