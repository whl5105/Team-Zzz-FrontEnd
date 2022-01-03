import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
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
import Diary from "../pages/Diary";
import DiaryWrite from "../components/DiaryWrite";
import Voice from "../pages/Voice";
import RequireLogin from "../components/RequireLogin";
import Asmr from "../pages/Asmr";
import Mypage from "../pages/MyPage";
import MyPageNotification from "../pages/MyPageNotification";
import Navigation from "../components/Navigation";

function App() {
  return (
    <Wrap>
      <ThemeProvider theme={theme}>
        <div className="App">
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/clock" exact component={Clock} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/requireLogin" exact component={RequireLogin} />
              <Route path="/push" exact component={Push} />
              <Route
                path="/pushNotication"
                exact
                component={PushNoticationPop}
              ></Route>
              <Route path="/diary" exact component={Diary}></Route>
              <Route path="/diaryWrite" exact component={DiaryWrite}></Route>
              <Route path="/voice" exact component={Voice}></Route>
              <Route path="/asmr" exact component={Asmr}></Route>
              <Route path="/mypage" exact component={Mypage} />
              <Route
                path="/mypageNotice/:userIdx"
                exact
                component={MyPageNotification}
              ></Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
            <Navigation></Navigation>
          </ConnectedRouter>
        </div>
      </ThemeProvider>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 375px;
  height: 812px;
  border: 1px solid red;
  background: white;
  position: relative;
  margin: 0 auto;
`;

export default App;
