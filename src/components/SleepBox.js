import React from "react";

import Charater from "../elements/Charater";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/diary";

const SleepBox = (props) => {
  const dispatch = useDispatch();

  const arr_list = new Array(5).fill("");
  const [arr, setArr] = React.useState(arr_list);

  const iconClick = (e) => {
    dispatch(userActions.setPreviewSleep(e.target.dataset.value));
  };
  return (
    <div>
      {/* 편집 onClick on:off */}
      {props.edit ? (
        <div style={{ display: "flex" }}>
          {arr.map((arr, idx) => {
            return (
              <div key={idx}>
                <Charater
                  shape="sleep"
                  size="40"
                  sleepNumber={idx + 1}
                  _onClick={iconClick}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          {arr.map((arr, idx) => {
            return (
              <div key={idx}>
                <Charater shape="sleep" size="40" sleepNumber={idx + 1} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SleepBox;
