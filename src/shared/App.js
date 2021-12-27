import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

//page
import Main from "../pages/Main";
import PushNoticationPop from "../pages/PushNoticationPop";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/pushNotication" exact component={PushNoticationPop}></Route>
      </ConnectedRouter>
    </div>
  );
}

export default App;
