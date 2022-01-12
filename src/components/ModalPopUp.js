import React from "react";
import styled from "styled-components";

const ModalPopUp = (props) => {
  const { children, close, backgroundNull } = props;
  const styles = { backgroundNull: backgroundNull };

  return (
    <React.Fragment>
      <Component onClick={close}></Component>
      <Children {...styles}>{children}</Children>
    </React.Fragment>
  );
};
const Component = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Children = styled.div`
  width: ${(props) => props.width};
  background-color: ${(props) => (props.backgroundNull ? null : "#fff")};
  border-radius: 12px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ModalPopUp;
