import React from "react";
import styled from "styled-components";
import { useReactPWAInstall } from "react-pwa-install";
import { use100vh } from "react-div-100vh";

import { isMobile } from "./DeviceDetector";
import { Button, Icon } from "../elements";

import {
  web_phone,
  web_back,
  web_logo,
  install_logo,
  install_download,
} from "../static/images";

const Device = ({ children }) => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const support = supported();
  const [isSupported, setIsSupported] = React.useState(null);
  const [webView, setWebView] = React.useState(true);
  const height = use100vh();

  const handleClick = () => {
    pwaInstall({
      title: "Zzz 다운받기",
      logo: install_logo,
    })
      .then(() => {
        setWebView(true);
      })
      .catch(() => {
        console.log("설치 실패")
      });
  };

  React.useEffect(() => {
    setIsSupported(support);
  }, [support]);

  return isMobile ? (
    <Content>
      {isSupported ? (
        <>
          {!isInstalled() && webView ? (
            <MobileInstallBtn>
              <Button marginB="20" _onClick={handleClick}>
                앱으로 다운받기
              </Button>
              <Button
                _onClick={() => {
                  setWebView(false);
                  alert(isSupported);
                  alert("webView", webView);
                }}
              >
                모바일 웹으로 이용하러 가기
              </Button>
            </MobileInstallBtn>
          ) : (
            <Mobile style={{ height: height }}>{children}</Mobile>
          )}
        </>
      ) : (
        <Mobile style={{ height: height }}>{children}</Mobile>
      )}
    </Content>
  ) : (
    <WebBackgroundWrapper>
      {isSupported ? (
        <>
          {!isInstalled() ? (
            <WebInstallBtn onClick={handleClick}>
              <Icon src={install_download}></Icon>
              <p>앱 다운로드</p>
            </WebInstallBtn>
          ) : null}
        </>
      ) : null}
      <Phone>
        <WebViewLayout>{children}</WebViewLayout>
      </Phone>
    </WebBackgroundWrapper>
  );
};

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const MobileInstallBtn = styled.div`
  padding: 20px;
`;

const Mobile = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  min-width: 280px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const WebBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${web_logo}), url(${web_back});
  background-size: 300px 144px, cover;
  background-position: 326px 230px, 0% 100%;
  background-repeat: no-repeat;
`;

const Phone = styled.div`
  width: 426px;
  height: 92%;
  min-height: 750px;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  background: url(${web_phone}) no-repeat;
  background-size: 100% 100%;

  @media screen and (min-width: 1120px) {
    right: 10%;
    top: 50%;
    transform: translate(0%, -50%);
  }
`;

const WebViewLayout = styled.div`
  max-width: 375px;
  height: calc(100% - 43px);
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
`;

const WebInstallBtn = styled.div`
  width: 204px;
  height: 54px;
  position: relative;
  top: 420px;
  left: 380px;
  border-radius: 32px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  font-family: "Noto Sans KR", sans-serif;
  color: #101340;
  cursor: pointer;

  & img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`;

export default Device;
