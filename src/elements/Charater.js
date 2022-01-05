import React from "react";
import styled from "styled-components";

import { ReactComponent as Feel0 } from "../static/images/character/feel0.svg";
import { ReactComponent as Feel1 } from "../static/images/character/feel1.svg";
import { ReactComponent as Feel2 } from "../static/images/character/feel2.svg";
import { ReactComponent as Feel3 } from "../static/images/character/feel3.svg";
import { ReactComponent as Feel4 } from "../static/images/character/feel4.svg";
import { ReactComponent as Feel5 } from "../static/images/character/feel5.svg";

const Charater = (props) => {
  const {
    shape,
    size,
    _onClick,
    margin,
    position,
    name,
    children,
    is_click,
    scoreColor,
  } = props;

  const styles = {
    size: size,
    margin: margin,
    position: position,
    is_click: is_click,
    bg: scoreColor,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }
  //-- 표정 --
  if (shape === "feel") {
    return (
      <div>
        <ImgIcon
          {...styles}
          onClick={_onClick}
          data-value={props.feelNumber}
          name={name}
          src={require(`../static/images/character/feel${props.feelNumber}.svg`)}
        ></ImgIcon>
        {children}
      </div>
    );
  }
  //-- 느낌 --
  if (shape === "sleep") {
    return (
      <div>
        <ImgIcon
          {...styles}
          onClick={_onClick}
          data-value={props.sleepNumber}
          // name="sleepScore"
          name={name}
          src={require(`../static/images/character/sleep${props.sleepNumber}.png`)}
        ></ImgIcon>
        {children}
      </div>
    );
  }
  // -- 캐릭터 혼합 --
  if (shape === "charater") {
    return (
      <React.Fragment>
        <IconBox {...styles}>
          {props.feelNumber === 0 && (
            <ImgIcon
              {...styles}
              onClick={_onClick}
              style={{ zIndex: "3" }}
              name={name}
              src={require(`../static/images/character/feel${props.feelNumber}.svg`)}
            />
          )}
          {props.feelNumber === 1 && <Feel1 fill={props.scoreColor}></Feel1>}
          {props.feelNumber === 2 && <Feel2 fill={props.scoreColor}></Feel2>}
          {props.feelNumber === 3 && <Feel3 fill={props.scoreColor}></Feel3>}
          {props.feelNumber === 4 && <Feel4 fill={props.scoreColor}></Feel4>}
          {props.feelNumber === 5 && <Feel5 fill={props.scoreColor}></Feel5>}

          {/* <ImgIcon
            {...styles}
            onClick={_onClick}
            style={{ zIndex: "3" }}
            name={name}
            src={require(`../static/images/character/feel${props.feelNumber}.svg`)}
          /> */}
          {/* <ImgIcon
            {...styles}
            onClick={_onClick}
            style={{ zIndex: "2" }}
            name={name}
            src={require(`../static/images/character/sleep${props.sleepNumber}.svg`)}
          /> */}
        </IconBox>
      </React.Fragment>
    );
  }

  return <React.Fragment></React.Fragment>;
};

//-- defaultProps --
Charater.defaultProps = {
  shape: "circle",
  src: "../static/images/character/feel0.svg",
  size: 24,
  _onClick: () => {},
  children: null,
  text: false,
  is_click: false,
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
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.margin ? `margin : ${props.margin}` : `margin: 0 auto;`)}
`;

const ImgIcon = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  position: ${(props) => props.position};
  border-radius: 50%;
  ${(props) => (props.is_click ? `border : 1px solid red;` : ``)};
  fill: ${(props) => (props.bg ? props.bg : "#F3F3F3")};
  svg path {
    fill: ${(props) => props.sleepColor};
  }
`;

export default Charater;
