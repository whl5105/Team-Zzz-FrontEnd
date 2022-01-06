import React from "react";
import styled from "styled-components";
import NoInfo from "../static/images/diary/오브젝트.png";

const Spinner = (props) => {
  console.log(props.height);
  return (
    <>
      <Outter height={props.height} top={props.top && props.top}></Outter>
    </>
  );
};

const Outter = styled.div`
  height: ${(props) => props.height};
  /* height: 620px; */
  margin-top: ${(props) => props.top};
  background-image: url(${NoInfo});
  background-repeat: no-repeat;
  z-index: 1000000;
`;

export default Spinner;
