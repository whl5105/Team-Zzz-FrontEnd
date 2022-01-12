import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "../static/styles/GlobalStyle";
import theme from "./theme";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch, Route } from "react-router-dom";
import "./App.css";

//page
import BackGround from "../components/main/Background";
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
import MixListPopUp from "../components/mixList/MixListPopUp";
import Mypage from "../pages/MyPage";
import MixList from "../pages/MixList";
import MyPageNotification from "../pages/MyPageNotification";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import NoticePage from "../pages/NoticePage";
import PlayBar from "../components/PlayBar";

function App() {
  return (
    <WrapBox id="app">
      <BackGround />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Wrap className="App">
          <ConnectedRouter history={history}>
            <Header></Header>
            <Container>
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
                  component={FirstNotification}
                ></Route>
                <Route path="/diary" exact component={Diary}></Route>
                <Route path="/asmr" exact component={Asmr}></Route>
                <Route path="/asmrPop" exact component={AsmrPopUp}></Route>
                <Route
                  path="/asmr/mixListPopUp"
                  exact
                  component={MixListPopUp}
                ></Route>
                <Route path="/mypage" exact component={Mypage} />
                <Route path="/mypage/mixList" exact component={MixList} />
                <Route
                  path="/mypageNotice/:userIdx"
                  exact
                  component={MyPageNotification}
                ></Route>
                <Route path="/notice" exact component={NoticePage}></Route>

                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Container>
            <PlayBar></PlayBar>
            <Navigation></Navigation>
          </ConnectedRouter>
        </Wrap>
      </ThemeProvider>
    </WrapBox>
  );
}

const WrapBox = styled.div`
  width: 100vw;
  /* height: 100vh; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* height: 100vh; */
`;

const Wrap = styled.div`
  /* min-width: 400px; */
  width: 375px;
  /* height: 812px; */
  height: 94%;
  background-color: ${({ theme }) => theme.colors.bg};
  position: absolute;
  top: 50%;
  right: 17%;
  transform: translateY(-50%);
  border: 1px solid #fff;
  overflow: hidden;
  @media (max-width: 500px) {
    min-width: 335px;
    /* background-color: lightblue; */
    width: 100%;
    height: 100vh;
    right: 0;
  }
`;
const Container = styled.div`
  /* padding-top: 50px; */
  /* padding: 50px ${({ theme }) => theme.paddings.xxxxl}; */
`;

export default App;
