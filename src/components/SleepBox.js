import React from "react";

import Charater from "../elements/Charater";

const SleepBox = (props) => {
  const arr_list = new Array(5).fill("");
  const [arr, setArr] = React.useState(arr_list);

  const [state, setState] = React.useState({
    feelScore: "0",
    sleepScore: "0",
  });
  return (
    <div>
      <div style={{ display: "flex" }}>
        {arr.map((arr, idx) => {
          return (
            <div key={idx}>
              <Charater shape="sleep" size="40" sleepNumber={idx + 1} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SleepBox;
