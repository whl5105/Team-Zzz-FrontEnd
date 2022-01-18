import React from "react";
import styled from "styled-components";

const ModalPopUp = (props) => {
<<<<<<< HEAD
  const { children, close, backgroundNull, zIndex, marginNull } = props;
  const styles = {
    backgroundNull: backgroundNull,
    zIndex: zIndex,
    marginNull: marginNull,
  };

  return (
    <PopUpBox onClick={close}>
      <Component />
=======
  const { children, close, backgroundNull, zIndex, width } = props;
  const styles = {
    backgroundNull: backgroundNull,
    zIndex: zIndex,
    width: width,
  };

  return (
    <PopUpBox>
      <Component onClick={close}></Component>
>>>>>>> 62fe15b848907859712a3f039833ca682c31efc3
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
  /* width: ${(props) => props.width} */

  width: ${(props) => (props.width ? props.width : "calc(100% - 40px)")};
  background-color: ${(props) => (props.backgroundNull ? null : "#FFFFFF")};
  border-radius: 12px;
  z-index: ${(props) => (props.zIndex ? props.zIndex : "999")};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: ${(props) => (props.marginNull ? "0px 0px" : "0px 20px")};
`;

export default ModalPopUp;
