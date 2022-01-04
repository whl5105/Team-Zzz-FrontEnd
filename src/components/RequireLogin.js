import styled from "styled-components";
import React from "react";
import ModalPopUp from "./ModalPopUp";

const RequireLogin = (props) => {
  return (
    <>
      <ModalPopUp close={props.close}>
        <Wrap>
          <div>
            <Title>로그인이 필요합니다.</Title>
            <SubTitle>로그인 화면으로 이동 하시겠습니까?</SubTitle>
          </div>
          <div>
            <Button
              border="1px solid #DADADA"
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
              onClick={() => {
                props.close("/login");
              }}
            >
              예
            </Button>
          </div>
        </Wrap>
      </ModalPopUp>
    </>
  );
};

const Wrap = styled.div`
  width: 200px;
  height: 200px;
`;

const Title = styled.p`
  width: 295px;
  height: 27px;
  margin: auto;
  margin-bottom: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray_9};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeight.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  letter-spacing: -0.3px;
`;

const SubTitle = styled.p`
  width: 295px;
  height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray_7};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeight.ssmall}
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  letter-spacing: -0.3px;
`;

const Button = styled.button`
  width: 130px;
  height: 48px;
  border-radius: 8px;
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeight.xxl}
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  letter-spacing: -0.3px;
  margin: 10px;
`;

export default RequireLogin;
