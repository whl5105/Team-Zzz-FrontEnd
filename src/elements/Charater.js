import React from "react";
import styled from "styled-components";

const Charater = (props) => {
  const {
    shape,
    size,
    _onClick,
    margin,
    position,
    name,
    text,
    children,
    is_me,
    border,
  } = props;

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
      <div>
        {is_me ? (
          <ImgIcon
            {...styles}
            // style={{ border: `1px solid red ` }}
            onClick={_onClick}
            data-value={props.feelNumber}
            name={name}
            src={require(`../images/character/feel${props.feelNumber}.png`)}
          ></ImgIcon>
        ) : (
          <ImgIcon
            {...styles}
            // style={{ border: `1px solid red ` }}
            onClick={_onClick}
            data-value={props.feelNumber}
            name={name}
            src={require(`../images/character/feel${props.feelNumber}.png`)}
          ></ImgIcon>
        )}

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
          src={require(`../images/character/sleep${props.sleepNumber}.png`)}
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
          <ImgIcon
            {...styles}
            onClick={_onClick}
            style={{ zIndex: "3" }}
            name={name}
            src={require(`../images/character/feel${props.feelNumber}.png`)}
          />
          <ImgIcon
            {...styles}
            onClick={_onClick}
            style={{ zIndex: "2" }}
            name={name}
            src={require(`../images/character/sleep${props.sleepNumber}.png`)}
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
  children: null,
  text: false,
  is_click: "",
  // border: "none",
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
  border-radius: 50%;
  ${(props) => (props.is_me ? `border : 1px solid red` : ``)}
`;

export default Charater;
