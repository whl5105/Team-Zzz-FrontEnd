import React from "react";

import Charater from "../elements/Charater";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/diary";

const FeelBox = (props) => {
  const dispatch = useDispatch();

  const arr_list = new Array(5).fill("");
  const [arr, setArr] = React.useState(arr_list);

  // const [arr, setArr] = React.useState(["1", "3", "5", "4", "2"]);
  // console.log(arr.length);
  // const arr_list = new Array(5).fill("1", "3", "5", "4", "2");
  // console.log(arr);
  // const [arr, setArr] = React.useState(arr_list);

  const iconClick = (e) => {
    dispatch(userActions.setPreviewFeel(e.target.dataset.value));
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
                  shape="feel"
                  size="40"
                  feelNumber={idx + 1}
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
                <Charater shape="feel" size="40" feelNumber={idx + 1} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeelBox;
