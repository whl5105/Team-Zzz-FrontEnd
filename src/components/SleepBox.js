import React from "react";
import Charater from "../elements/Charater";

const SleepBox = (props) => {
  const { previewSleep } = props;
  const [arr, setArr] = React.useState([
    { text: "부족++", score: 1, color: "#6CA8FF" },
    { text: "부족", score: 3, color: "#90D3CC" },
    { text: "적당", score: 5, color: "#FCD371" },
    { text: "과잉", score: 4, color: "#EE8BA7" },
    { text: "과잉++", score: 2, color: "#C793DC" },
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
                  shape="sleep"
                  size="40"
                  name={arr.score}
                  bg={arr.color}
                  sleepNumber={idx + 1}
                  _onClick={props._onClick}
                  is_click={previewSleep === idx + 1 ? true : false}
                >
                  {arr.text}
                </Charater>
                {/* <Charater
                  shape="sleep"
                  size="40"
                  name={arr.score}
                  sleepNumber={idx + 1}
                  _onClick={props._onClick}
                  is_click={previewSleep === idx + 1 ? true : false}
                >
                  {arr.text}
                </Charater> */}
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
                  shape="sleep"
                  size="40"
                  name={arr.score}
                  sleepNumber={idx + 1}
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

export default SleepBox;
