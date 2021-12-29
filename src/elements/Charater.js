import zIndex from "@mui/material/styles/zIndex";
import { style } from "@mui/system";
import React from "react";
import styled from "styled-components";

const Charater = (props) => {
  const { shape, size, src, _onClick, margin, position } = props;

  const styles = {
    size: size,
    margin: margin,
    position: position,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }
  //-- 표정 --
  if (shape === "feel") {
    return (
      <ImgIcon
        onClick={_onClick}
        {...styles}
        src={require(`../images/character/feel${props.feelNumber}.png`)}
      />
    );
  }
  //-- 느낌 --
  if (shape === "sleep") {
    return (
      <ImgIcon
        {...styles}
        src={require(`../images/character/sleep${props.sleepNumber}.png`)}
      />
    );
  }
  // -- 캐릭터 혼합 --
  if (shape === "charater") {
    return (
      <React.Fragment>
        <IconBox {...styles}>
          <ImgIcon
            onClick={_onClick}
            {...styles}
            style={{ zIndex: "3" }}
            src={require(`../images/character/feel${props.feelNumber}.png`)}
          />
          <ImgIcon
            onClick={_onClick}
            {...styles}
            style={{ zIndex: "2" }}
            src={require(`../images/character/sleep${props.sleepNumber}.png`)}
            onClick={_onClick}
          />
        </IconBox>
      </React.Fragment>
    );
  }

  return <React.Fragment></React.Fragment>;
};

//-- defaultProps --
Charater.defaultProps = {
  shape: "circle",
  src: "../images/character/sleep0.png",
  size: 24,
  _onClick: () => {},
};

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const IconBox = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  position: "relative";
  border-radius: var(--size);
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.margin ? `margin : ${props.margin}` : `margin: 0 auto;`)}
`;

const ImgIcon = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  position: ${(props) => props.position};
`;

export default Charater;
