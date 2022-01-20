import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import ReactGA from "react-ga";
// -- style --
import styled from "styled-components";

// -- page --
import NotFound from "../pages/NotFound";
import Main from "../pages/Main";
import OptimalSleepTime from "../pages/OptimalSleepTime";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Diary from "../pages/Diary";
import Asmr from "../pages/Asmr";
import AsmrVolumeControl from "../pages/AsmrVolumeControl";
import Mypage from "../pages/MyPage";
import MypageMixList from "../pages/MypageMixList";
import MyPageNotification from "../pages/MyPageNotification";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import MypageNotice from "../pages/MypageNotice";
import PlayBar from "../components/PlayBar";

//-- google analytics --
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
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }, []);

  return (
    <WrapBox className="App">
      
      {/* <Wrap > */}
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/signup" component={Signup} />
          <Route exact path="/optimalSleepTime" component={OptimalSleepTime} />
          <Route exact path="/asmr" component={Asmr} />
          <Route
            exact
            path="/asmr/asmrVolumeControl"
            component={AsmrVolumeControl}
          />
          <Route exact path="/diary" component={Diary} />
          <Route exact path="/mypage" component={Mypage} />
          <Route exact path="/mypage/mixList" component={MypageMixList} />
          <Route
            exact
            path="/mypage/notification/:userIdx"
            component={MyPageNotification}
          />
          <Route exact path="/mypage/notice" component={MypageNotice} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <PlayBar />
        <Navigation />
      </ConnectedRouter>
      {/* </Wrap> */}
    </WrapBox>
  );
}

const WrapBox = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
