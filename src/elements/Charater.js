import React, { memo, Profiler, useCallback } from "react";
import styled from "styled-components";

import { ReactComponent as Feel1 } from "../static/images/character/feel1.svg";
import { ReactComponent as Feel2 } from "../static/images/character/feel2.svg";
import { ReactComponent as Feel3 } from "../static/images/character/feel3.svg";
import { ReactComponent as Feel4 } from "../static/images/character/feel4.svg";
import { ReactComponent as Feel5 } from "../static/images/character/feel5.svg";

function Charater(props) {
  // function onRenderCallback(
  //   id, // 방금 커밋된 Profiler 트리의 "id"
  //   phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
  //   actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간
  //   baseDuration, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간
  //   startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
  //   commitTime, // React가 해당 업데이트를 언제 커밋했는지
  //   interactions // 이 업데이트에 해당하는 상호작용들의 집합
  // ) {
  //   // 렌더링 타이밍을 집합하거나 로그...
  //   // console.log(actualDuration); //랜더링 시간
  //   // console.log(startTime);
  //   // console.log(commitTime);
  //   console.log(phase);
  // }
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

  if (shape === "feel") {
    return (
      <>
        {/* <Profiler id="DayCharater" onRender={onRenderCallback}> */}
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
                  src={require(`../static/images/character/feel${props.feelNumber}.svg`)}
                  alt="Icon"
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
        {/* </Profiler> */}
      </>
    );
  }

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

  if (shape === "charater") {
    return (
      <>
        {/* <Profiler id="DayCharater" onRender={onRenderCallback}> */}
        <IconBox {...styles}>
          {props.feelNumber === 0 && (
            <ImgIcon
              {...styles}
              onClick={_onClick}
              style={{ zIndex: "3" }}
              data-value={props.feelNumber}
              src={require(`../static/images/character/feel${props.feelNumber}.svg`)}
              alt="Icon"
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
        {/* </Profiler> */}
      </>
    );
  }

  return <></>;
}

Charater.defaultProps = {
  shape: "circle",
  src: "../static/images/character/feel0.svg",
  size: 24,
  _onClick: () => {},
  children: null,
  text: false,
  is_click: false,
};

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

export default memo(Charater);
