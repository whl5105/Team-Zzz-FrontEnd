import React from "react";
import styled from "styled-components";

const Icon = (props) => {
  const {
    top,
    left,
    width,
    height,
    src,
    rotate,
    _onClick,
    position,
    marginR,
    padding,
  } = props;

  const styles = {
    top: top,
    left: left,
    width: width,
    height: height,
    src: src,
    rotate: rotate,
    position: position,
    marginR: marginR,
    padding: padding,
  };

  return (
    <>
      <ArrowIcon {...styles} onClick={_onClick} />
    </>
  );
};

Icon.defaultProps = {
  top: null,
  left: null,
  width: "24px",
  height: "24px",
  rotate: "0deg",
  _onClick: () => {},
  position: null,
};

const ArrowIcon = styled.img`
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  src: ${(props) => props.src};
  transform: ${(props) => `rotate(${props.rotate});`}
  cursor: pointer;
  ${(props) => (props.marginR ? `margin-right: ${props.marginR};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  box-sizing: border-box;
`;

export default Icon;
