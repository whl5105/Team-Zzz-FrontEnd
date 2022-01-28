import React, { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { ThemeContext } from "../shared/ThemeContext";

import ReactGA from "react-ga";
import styled from "styled-components";
import Spinner from "../components/Spinner";

import Navigation from "../components/Navigation";
import Header from "../components/Header";
import PlayBar from "../components/PlayBar";

const NotFound = lazy(() => import("../pages/NotFound"));
const Main = lazy(() => import("../pages/Main"));
const OptimalSleepTime = lazy(() => import("../pages/OptimalSleepTime"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Diary = lazy(() => import("../pages/Diary"));
const Asmr = lazy(() => import("../pages/Asmr"));
const AsmrVolumeControl = lazy(() => import("../pages/AsmrVolumeControl"));
const Mypage = lazy(() => import("../pages/MyPage"));
const MypageMixList = lazy(() => import("../pages/MypageMixList"));
const MyPageNotification = lazy(() => import("../pages/MyPageNotification"));
const MypageNotice = lazy(() => import("../pages/MypageNotice"));

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
  const [song1, setSong1] = useState(new Audio());
  const [song2, setSong2] = useState(new Audio());
  const [song3, setSong3] = useState(new Audio());
  const [song4, setSong4] = useState(new Audio());
  const [play, setPlay] = useState([]);

  const [toggle, setToggle] = useState(false);
  const [playbar, setPlaybar] = useState([]);

  useEffect(() => {
    ReactGA.initialize("299861253");
    history.listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }, []);

  return (
    <WrapBox className="App">
      <ThemeContext.Provider
        value={{
          song1,
          setSong1,
          song2,
          setSong2,
          song3,
          setSong3,
          song4,
          setSong4,
          play,
          setPlay,
          toggle,
          setToggle,
          playbar,
          setPlaybar,
        }}
      >
        <ConnectedRouter history={history}>
          <Header />
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/user/login" component={Login} />
              <Route exact path="/user/signup" component={Signup} />
              <Route
                exact
                path="/optimalSleepTime"
                component={OptimalSleepTime}
              />
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
          </Suspense>
          <PlayBar />
          <Navigation />
        </ConnectedRouter>
      </ThemeContext.Provider>
    </WrapBox>
  );
}

const WrapBox = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
