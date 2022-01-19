import React from "react";
import styled from "styled-components";

// --- images ---
import {
  feel1 as Feel1,
  feel2 as Feel2,
  feel3 as Feel3,
  feel4 as Feel4,
  feel5 as Feel5,
} from "../static/images";

const Charater = (props) => {
  const {
    shape,
    size,
    _onClick,
    margin,
    position,
    is_click,
    scoreColor,
    bgcolor,
    selectColor,
  } = props;

  const styles = {
    size: size,
    margin: margin,
    position: position,
    is_click: is_click,
    bg: scoreColor,
    bgcolor: bgcolor,
    selectColor: selectColor,
  };
  // //-- 표정 --
  if (shape === "feel") {
    return (
      <>
        <FeelBox>
          <ClickBox
            onClick={_onClick}
            data-score={props.score}
            data-value={props.feelNumber}
          />
          <Feel {...styles}>
            {props.feelNumber === 0 && (
              <ImgIcon
                {...styles}
                style={{ zIndex: "3" }}
                src={require(`../static/images/feel${props.feelNumber}`)}
              />
            )}
            {props.feelNumber === 1 && (
              <Feel1
                fill={props.scoreColor}
                width={props.size}
                height={props.size}
              />
            )}
            {props.feelNumber === 2 && (
              <Feel2
                fill={props.scoreColor}
                width={props.size}
                height={props.size}
              />
            )}
            {props.feelNumber === 3 && (
              <Feel3
                fill={props.scoreColor}
                width={props.size}
                height={props.size}
              />
            )}
            {props.feelNumber === 4 && (
              <Feel4
                fill={props.scoreColor}
                width={props.size}
                height={props.size}
              />
            )}
            {props.feelNumber === 5 && (
              <Feel5
                fill={props.scoreColor}
                width={props.size}
                height={props.size}
              />
            )}
          </Feel>
        </FeelBox>
        <p>{props.text}</p>
      </>
    );
  }
  //-- 느낌 --
  if (shape === "sleep") {
    return (
      <div>
        <Sleep
          {...styles}
          onClick={_onClick}
          data-score={props.score}
          data-value={props.sleepNumber}
        />
        <p>{props.text}</p>
      </div>
    );
  }
  // -- 캐릭터 혼합 --
  if (shape === "charater") {
    return (
      <>
        <IconBox {...styles}>
          {props.feelNumber === 0 && (
            <ImgIcon
              {...styles}
              onClick={_onClick}
              style={{ zIndex: "3" }}
              data-value={props.feelNumber}
              src={require(`../static/images/feel${props.feelNumber}`)}
            />
          )}
          {props.feelNumber === 1 && (
            <Feel1
              fill={props.scoreColor}
              onClick={_onClick}
              width={props.size}
              height={props.size}
            />
          )}
          {props.feelNumber === 2 && (
            <Feel2
              fill={props.scoreColor}
              onClick={_onClick}
              width={props.size}
              height={props.size}
            />
          )}
          {props.feelNumber === 3 && (
            <Feel3
              fill={props.scoreColor}
              onClick={_onClick}
              width={props.size}
              height={props.size}
            />
          )}
          {props.feelNumber === 4 && (
            <Feel4
              fill={props.scoreColor}
              onClick={_onClick}
              width={props.size}
              height={props.size}
            />
          )}
          {props.feelNumber === 5 && (
            <Feel5
              fill={props.scoreColor}
              onClick={_onClick}
              width={props.size}
              height={props.size}
            />
          )}
        </IconBox>
      </>
    );
  }

  return <React.Fragment></React.Fragment>;
};

//-- defaultProps --
Charater.defaultProps = {
  shape: "circle",
  src: "../static/images/feel0",
  size: 24,
  _onClick: () => {},
  children: null,
  text: false,
  is_click: false,
};

// --- styled-components ---
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

const Sleep = styled.div`
  width: 20px;
  height: 20px;
  position: ${(props) => props.position};
  margin: 0 auto 10px auto;
  border-radius: 50%;
  ${(props) =>
    props.bgcolor
      ? `background-color : ${props.bgcolor};`
      : `background-color:#eee`};
  ${(props) =>
    props.is_click
      ? `border : 3px solid #fde9b8 ; background-color:${props.selectColor}`
      : `background-color : ${props.bgcolor};`};
`;

const FeelBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  & p {
    display: black;
  }
`;
const Feel = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  ${(props) => (props.is_click ? `background : #fde9b8` : ``)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 4.5px;
  margin: 0 auto 10px auto;
  top: 0;
`;
const ClickBox = styled.div`
  width: 44px;
  height: 44px;
  position: absolute;
  z-index: 999;
  top: 0;
`;

export default Charater;
