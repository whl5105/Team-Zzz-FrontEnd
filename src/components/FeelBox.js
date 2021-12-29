import React from "react";

import Charater from "../elements/Charater";

const FeelBox = (props) => {
  const arr_list = new Array(5).fill("");
  const [arr, setArr] = React.useState(arr_list);

  const [state, setState] = React.useState({
    feelScore: "0",
    sleepScore: "0",
  });

  const iconClick = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.dataset.value,
    });
  };

  return (
    <div>
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
    </div>
  );
};

export default FeelBox;
