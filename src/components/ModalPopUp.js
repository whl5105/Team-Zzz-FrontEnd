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
  background-color: #fff;
  border-radius: 12px;
  z-index: 999;
  position: absolute;
  margin: 50% 20px;
  top: 0;
  left: 0;
`;

export default ModalPopUp;
