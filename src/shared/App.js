import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "../static/styles/GlobalStyle";
import theme from "./theme";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
// import "../static/fonts/font.css";

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
import RequireLogin from "../components/RequireLogin";
import Asmr from "../pages/Asmr";
import Mypage from "../pages/MyPage";
import MyPageNotification from "../pages/MyPageNotification";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import ModalPopUp from "../components/ModalPopUp";

function App() {
  return (
    <WrapBox id="app">
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
                  component={PushNoticationPop}
                ></Route>
                <Route path="/diary" exact component={Diary}></Route>
                {/* <Route path="/diary" exact component={DiaryWrite}></Route> */}
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
            </Container>
            <Navigation></Navigation>
          </ConnectedRouter>
        </Wrap>
      </ThemeProvider>
    </WrapBox>
  );
}

const WrapBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrap = styled.div`
  width: 375px;
  height: 812px;
  background-color: ${({ theme }) => theme.colors.bg};
  position: relative;
  margin: 0 auto;
  overflow: hidden;
`;
const Container = styled.div`
  padding-top: 50px;
`;

export default App;
