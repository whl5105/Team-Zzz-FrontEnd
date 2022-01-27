import React from "react";
import styled from "styled-components";
import { useReactPWAInstall } from "react-pwa-install";

import { Icon } from "../elements";

import { install_logo, install_download } from "../static/images";

const PwaInstall = (props) => {
  const { pwaInstall } = useReactPWAInstall();

  const handleClick = () => {
    pwaInstall({
      title: "Zzz 다운받기",
      logo: install_logo,
    })
      .then(() => {
        // 설치 성공
      })
      .catch(() => {
        console.log("설치 실패");
      });
  };

  return (
    <InstallBox>
      {props.web ? (
        <WebInstall>
          <Icon
            src={install_download}
            width="24px"
            height="24px"
            marginR="10px"
          ></Icon>
          <WebInstallButton onClick={handleClick}>
            {props.text}
          </WebInstallButton>
        </WebInstall>
      ) : (
        <>
          <MobileInstallButton onClick={handleClick}>
            {props.text}
          </MobileInstallButton>
        </>
      )}
    </InstallBox>
  );
};

const InstallBox = styled.div`
  cursor: pointer;
`;

const WebInstall = styled.div`
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
`;

const WebInstallButton = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  color: #101340;
  cursor: pointer;
`;

const MobileInstallButton = styled.div`
  width: 200px;
  height: 48px;
  background: #fff;
  border-radius: 48px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  color: ${({ theme }) => theme.colors.bg};
  line-height: 48px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export default PwaInstall;
