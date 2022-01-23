import React from "react";
import styled from "styled-components";
const Toggle = (props) => {
  return (
    <>
      {props.label}
      <ToggleSwitch className="toggle-switch">
        <CheckBox
          type="checkbox"
          className="checkbox"
          name={props.label}
          id={props.label}
          checked={props.notice}
          onChange={() => {
            props.setNotice(!props.notice);
          }}
        />
        <Label className="label" htmlFor={props.label}>
          <Inner className="inner" />
          <Switch className="switch" />
        </Label>
      </ToggleSwitch>
    </>
  );
};

// --- styled-components ---
const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  display: inline-block;
  text-align: left;
  top: -1px;
`;

const CheckBox = styled.input`
  display: none;

  &.checkbox:checked + .label .inner {
    margin-left: 0;
  }

  &.checkbox:checked + .label .switch {
    right: 0px;
  }
`;

const Label = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 0 solid #bbb;
  border-radius: 20px;
`;

const Inner = styled.span`
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;

  &::before,
  &::after {
    float: left;
    width: 50%;
    height: 30px;
    padding: 0;
    line-height: 36px;
    color: #fff;
    font-weight: bold;
    box-sizing: border-box;
  }

  &::before {
    content: "";
    padding-left: 10px;
    background-color: #fbc037;
    color: #fff;
  }

  &::after {
    content: "";
    padding-right: 10px;
    background-color: #bbb;
    color: #fff;
    text-align: right;
  }
`;

const Switch = styled.span`
  display: block;
  width: 20px;
  margin: 5px;
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  border: 0 solid #bbb;
  border-radius: 20px;
  transition: all 0.3s ease-in 0s;
`;

export default Toggle;
