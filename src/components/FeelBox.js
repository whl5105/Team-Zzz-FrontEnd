import React from "react";
import Charater from "../elements/Charater";

const FeelBox = (props) => {
  const { previewFeel } = props;
  const [arr, setArr] = React.useState([
    { text: "과하게피곤", score: 1 },
    { text: "피곤", score: 3 },
    { text: "적당", score: 5 },
    { text: "에너지 넘침", score: 4 },
    { text: "과하게잠", score: 2 },
  ]);

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
                  feelNumber={idx + 1}
                  _onClick={props._onClick}
                  is_click={previewFeel === idx + 1 ? true : false}
                  bg
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
                  feelNumber={idx + 1}
                  bg
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
