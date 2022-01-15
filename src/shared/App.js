import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "../static/styles/GlobalStyle";
import theme from "./theme";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch, Route } from "react-router-dom";
import "./App.css";

// page
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
import Mypage from "../pages/MyPage";
import MixList from "../pages/MixList";
import MyPageNotification from "../pages/MyPageNotification";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import NoticePage from "../pages/NoticePage";
import PlayBar from "../components/PlayBar";

// // firebase
// import firebase from "firebase/compat/app"; //firebase모듈을 import해줘야 합니다.
// import "firebase/compat/messaging";
// import { getMessaging, getToken } from "firebase/messaging";

// const config = {
//   apiKey: "AIzaSyACNv3mnjYQGw6A0Q08ENgY1K_NTexyvOI",
//   authDomain: "zzz-pwa.firebaseapp.com",
//   projectId: "zzz-pwa",
//   storageBucket: "zzz-pwa.appspot.com",
//   messagingSenderId: "167031359028",
//   appId: "1:167031359028:web:c63f06088b6c5aec6eac61",
//   measurementId: "G-Y1RRKXLCN7",
// };
// firebase.initializeApp(config);
// const messaging = firebase.messaging();

// Notification.requestPermission().then((permission) => {
//   if (permission === "granted") {
//     console.log("Notification permission granted.");
//     messaging
//       .getToken()
//       .then(function (token) {
//         console.log(token);
//         dispatch(noticeActions.setNoticeDB(props.notice));
//       })
//       .catch(function (error) {
//         console.log("Error : ", error);
//       });
//   } else {
//     console.log("Unable to get permission to notify.");
//   }
// });
// messaging.onMessage(function (payload) {
//   console.log(payload.notification.title);
//   console.log(payload.notification.body);
// });
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
                <Route path="/asmr" component={Asmr}></Route>
                <Route path="/asmrPop" exact component={AsmrPopUp}></Route>
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
  touch-action: auto;
`;

const Wrap = styled.div`
  width: 375px;
  height: 94%;
  background-color: ${({ theme }) => theme.colors.bg};
  position: absolute;
  top: 50%;
  right: 17%;
  transform: translateY(-50%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  @media (max-width: 500px) {
    min-width: 335px;
    width: 100%;
    height: 100vh;
    right: 0;
    border: none;
  }
`;
const Container = styled.div`
  height: 100%;
`;

export default App;
