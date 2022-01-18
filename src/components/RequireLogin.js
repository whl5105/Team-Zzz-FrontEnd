import styled from "styled-components";
import React from "react";

// --- components ---
import ModalPopUp from "./ModalPopUp";

const RequireLogin = (props) => {
  return (
    <>
      <ModalPopUp close={props.close}>
        <Wrap>
          <Title>로그인이 필요합니다.</Title>
          <SubTitle>로그인 화면으로 이동 하시겠습니까?</SubTitle>
          <Buttons>
            <Button
              border="1px solid #DADADA"
              marginRight="10px"
              color="#696969"
              backgroundColor="#ffffff"
              onClick={props.close}
            >
              아니오
            </Button>
            <Button
              border="none"
              color="#ffffff"
              backgroundColor="#FBC037"
              onClick={props.move}
            >
              예
            </Button>
          </Buttons>
        </Wrap>
      </ModalPopUp>
    </>
  );
};

const Wrap = styled.div`
  text-align: center;
  padding: 20px;
  /* width: 100%;
  height: 153px; */
`;

const Title = styled.p`
  margin-bottom: 12px;
  /* width: 100%;
  height: 27px;
  margin-top: 20px;
  margin-left: 20px; */
  /* text-align: center; */
  color: ${({ theme }) => theme.colors.gray_9};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeight.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  letter-spacing: -0.3px;
`;

const SubTitle = styled.p`
margin-bottom: 24px;
  /* width: 100%;
  height: 22px;
  margin-top: 12px;
  margin-left: 20px; */
  /* text-align: center; */
  color: ${({ theme }) => theme.colors.gray_7};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeight.ssmall}
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  letter-spacing: -0.3px;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  /* margin-left: 20px;
  margin-top: 24px; */
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeight.xxl}
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  letter-spacing: -0.3px;
  margin-right: ${(props) => props.marginRight};
`;

export default RequireLogin;
