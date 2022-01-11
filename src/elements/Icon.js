import React from "react";
import styled from "styled-components";

const Icon = (props) => {
  const {
    categoryImage,
    top,
    left,
    width,
    height,
    src,
    rotate,
    _onClick,
    position,
  } = props;
  const styles = {
    categoryImage: categoryImage,
    top: top,
    left: left,
    width: width,
    height: height,
    src: src,
    rotate: rotate,
    position: position,
  };

  return (
    <>
      <ArrowIcon {...styles} onClick={_onClick}></ArrowIcon>
    </>
  );
};

Icon.defaultProps = {
  categoryImage: null,
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
`;

export default Icon;
