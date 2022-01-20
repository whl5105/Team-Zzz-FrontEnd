import React from "react";
import styled from "styled-components";
import GlobalStyle from "../static/styles/GlobalStyle";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import ReactGA from "react-ga";

// page
import NotFound from "../pages/NotFound";
import Main from "../pages/Main";
import FirstNotification from "../pages/FirstNotification";
import Clock from "../pages/Clock";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Push from "./Push";
import Diary from "../pages/Diary";
import RequireLogin from "../components/RequireLogin";
import Asmr from "../pages/Asmr";
import AsmrPopUp from "../pages/AsmrPopUp";
import Mypage from "../pages/MyPage";
import MixList from "../pages/MixList";
import MyPageNotification from "../pages/MyPageNotification";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import NoticePage from "../pages/NoticePage";
import PlayBar from "../components/PlayBar";
import Test from "../pages/Test";

ReactGA.event({
  category: "User",
  action: "Created an Account",
});

ReactGA.exception({
  description: "An error ocurred",
  fatal: true,
});

function App() {
  React.useEffect(() => {
    ReactGA.initialize("user id");
    history.listen((location) => {
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  
  return (
    <WrapBox id="app">
      <GlobalStyle />
      <Wrap className="App">
        <ConnectedRouter history={history}>
          <Header />

          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/clock" exact component={Clock} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/requireLogin" exact component={RequireLogin} />
            <Route path="/push" exact component={Push} />
            <Route path="/pushNotication" exact component={FirstNotification} />
            <Route path="/diary" exact component={Diary} />
            <Route path="/asmr" component={Asmr} />
            <Route path="/asmrPop" exact component={AsmrPopUp} />
            <Route path="/mypage" exact component={Mypage} />
            <Route path="/mypage/mixList" exact component={MixList} />
            <Route
              path="/mypageNotice/:userIdx"
              exact
              component={MyPageNotification}
            />
            <Route path="/notice" exact component={NoticePage} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <PlayBar />
          <Navigation />
        </ConnectedRouter>
      </Wrap>
    </WrapBox>
  );
}

const WrapBox = styled.div`
  width: 100%;
  height: inherit;
`;

const Wrap = styled.div`
  height: inherit;
`;

export default App;
