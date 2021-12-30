import React from "react";

import Charater from "../elements/Charater";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/diary";

const FeelBox = (props) => {
  const dispatch = useDispatch();

  // const arr_list = new Array(5).fill("");
  // const [arr, setArr] = React.useState(arr_list);

  // const [arr, setArr] = React.useState(["1", "3", "5", "4", "2"]);
  const [arr, setArr] = React.useState([
    { text: "과하게피곤", score: "1" },
    { text: "피곤", score: "3" },
    { text: "적당", score: "5" },
    { text: "에너지 넘침", score: "4" },
    { text: "과하게잠", score: "2" },
  ]);

  const iconClick = (e) => {
    console.log(e.target.name);
    const previewFeel = e.target.dataset.value;
    const previewFeelScore = e.target.name;

    dispatch(userActions.setPreviewFeel(previewFeel, previewFeelScore));
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
                  name={arr.score}
                  // text={arr.text}
                  feelNumber={idx + 1}
                  _onClick={iconClick}
                >
                  {arr.text}
                </Charater>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          {arr.map((arr, idx) => {
            return (
              <div key={idx}>
                <Charater
                  shape="feel"
                  size="40"
                  name={arr.score}
                  // text={arr.text}
                  feelNumber={idx + 1}
                >
                  {arr.text}
                </Charater>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeelBox;
