import React from "react";
import styled from "styled-components";

const ModalPopUp = (props) => {
  const { children, close, backgroundNull, zIndex } = props;
  const styles = {
    backgroundNull: backgroundNull,
    zIndex: zIndex,
  };

  return (
    <PopUpBox onClick={close}>
      <Component></Component>
      <Children {...styles}>{children}</Children>
    </PopUpBox>
  );
};

const PopUpBox = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
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
  background-color: ${(props) => (props.backgroundNull ? null : "#FFFFFF")};
  border-radius: 12px;
  z-index: ${(props) => (props.zIndex ? props.zIndex : "999")};
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ModalPopUp;
