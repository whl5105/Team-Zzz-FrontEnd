import React from "react";
import styled from "styled-components";
import PwaInstall from "../components/PwaInstall";

import { mobile_back, mobile_logo } from "../static/images";

const MobileInstall = (props) => {
  const { _onClick } = props;

  return (
    <Content>
      <img src={mobile_logo} alt="mobile_logo" />
      <p>
        한번의 로그인으로 <br /> ASMR 믹스를 만들고 매일 수면기록 해요!
      </p>
      <>
        <PwaInstall text="편하게 앱 이용하기" />
        <span onClick={_onClick}>모바일 웹으로 이용하러 가기</span>
      </>
    </Content>
  );
};
MobileInstall.defaultProps = {
  _onClick: () => {},
};
const Content = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${mobile_back});
  background-size: 100%, 100%;
  background-position: 0%, 0%;
  background-repeat: no-repeat;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  text-align: center;
  padding-top:144px ;
  box-sizing: border-box;
  & img {
    width: 130px;
  }
  & p {
    padding: 40px 0;
  }
  & span {
    display: inline-block;
    position: relative;
    cursor: pointer;
    ::before {
      content: "";
      width: 100%;
      height: 1px;
      position: absolute;
      bottom: -4px;
      left: 0;
      z-index: 100;
      background-color: ${({ theme }) => theme.colors.white};
    }
`;
export default MobileInstall;
