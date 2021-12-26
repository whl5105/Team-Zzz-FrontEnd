import React from "react";
import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch, Route, Link } from "react-router-dom";

//page
import Main from "../pages/Main";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
