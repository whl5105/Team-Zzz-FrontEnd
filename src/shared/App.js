import React from "react";
import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch, Route, Link } from "react-router-dom";

//page
import NotFound from "../pages/NotFound";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
