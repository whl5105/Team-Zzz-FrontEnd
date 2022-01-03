import React from "react";
import Switch from "@mui/material/Switch";

const Toggle = (props) => {
  return (
    <>
      {props.label}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={props.label}
          id={props.label}
          checked={props.notice}
          onChange={() => {
            props.setNotice(!props.notice);
          }}
        />
        <label className="label" htmlFor={props.label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </>
  );
};

export default Toggle;
