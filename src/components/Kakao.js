import React from "react";
import styled from "styled-components";

import kakao from "../static/images/login/kakao.png";

const Kakao = (props) => {
  return (
    <Content>
      <Icon></Icon>
      카카오 로그인
    </Content>
  );
};
const Content = styled.div`
  text-align: center;
  padding: 20px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
`;
const Icon = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${kakao});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto 10px auto;
  cursor: pointer;
`;

export default Kakao;
