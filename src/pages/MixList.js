import React from "react";
import styled from "styled-components";

import Title from "../components/Title";

const MixList = (props) => {
  return (
    <Container>
      <Title backIcon>나의 믹스</Title>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 0;
`;

export default MixList;
