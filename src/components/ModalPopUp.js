import React from "react";
import styled from "styled-components";

const ModalPopUp = (props) => {
  const { children, close } = props;

  return (
    <React.Fragment>
      <Component onClick={close}></Component>
      <Children>{children}</Children>
    </React.Fragment>
  );
};
const Component = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ff00004f;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const Children = styled.div`
  /* width: 35%;
  height: 40%; */
  background-color: #fff;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
`;

export default ModalPopUp;
