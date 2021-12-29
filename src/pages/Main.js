import React from "react";
import { useHistory } from "react-router-dom";

import Navigation from "../components/Navigation";

const Main = (props) => {
  const history = useHistory();
  return (
    <React.Fragment>
      <div>mainpage</div>
      <Navigation marginTop="40%"></Navigation>
    </React.Fragment>
  );
};

export default Main;