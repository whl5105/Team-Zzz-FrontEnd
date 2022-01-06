import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const NotFound = (props) => {
  const history = useHistory();
  return (
    <Container>
      <P>주소가 올바르지 않아요!</P>
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        ZZZ 메인으로 가기
      </Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 50px ${({ theme }) => theme.paddings.xxxxl};
`;

const P = styled.p`
  width: 100%;
  height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  margin-top: 226px;
`;

const Button = styled.button`
  width: 295px;
  height: 48px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: ${({ theme }) => theme.colors.main_1};
  margin: 110px ${({ theme }) => theme.paddings.small};
  line-height: 35px;
`;
export default NotFound;
