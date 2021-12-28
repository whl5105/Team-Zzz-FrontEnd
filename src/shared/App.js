import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

//page
import NotFound from "../pages/NotFound";
import Main from "../pages/Main";
import PushNoticationPop from "../pages/PushNoticationPop";
import Clock from "../pages/Clock";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Push from "./Push";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/clock" exact component={Clock} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/pushNotication" exact component={PushNoticationPop}></Route>
          <Route path="/push" exact component={Push} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
