import React from "react";
import styled from "styled-components";
import NoInfo from "../static/images/diary/오브젝트.png"

const Spinner = (props) => {
  return (
    <>
      <Outter></Outter>
    </>
  );
};

const Outter = styled.div`
  height: 620px;
  margin-top: 13px;
  background-image: url(${NoInfo});
  background-repeat: no-repeat;
`;

export default Spinner;
