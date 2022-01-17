import React from "react";
import { history } from "../redux/configureStore";

const Test = (props) => {
  const [test, setTest] = React.useState("");
  console.log(history);
  React.useEffect(() => {
    setTest(history.test);
    console.log(history.test);
  }, []);
  return (
    <div>
      <span
        style={{
          position: "absolute",
          top: "100px",
          left: "10px",
          color: "white",
          Width: "100px",
        }}
      >
        {test}
      </span>
    </div>
  );
};

export default Test;
