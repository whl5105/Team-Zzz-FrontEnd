import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Button from "../elements/Button";

const NotFound = (props) => {
  const history = useHistory();
  return (
    <Container>
      <P>주소가 올바르지 않아요!</P>
      <Button
        size="16"
        text="ZZZ 메인으로 가기"
        marginT="150"
        _onClick={() => {
          history.push("/");
        }}
      ></Button>
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

export default NotFound;
