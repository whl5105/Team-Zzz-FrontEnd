import React from "react";
import styled from "styled-components";
import GlobalStyle from "../static/styles/GlobalStyle";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch, Route } from "react-router-dom";
import "./App.css";

// page
// import BackGround from "../components/main/Background";
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

// firebase
// import firebase from "firebase/compat/app"; //firebase모듈을 import해줘야 합니다.
// import "firebase/compat/messaging";

// const config = {
//   apiKey: "AIzaSyD7vx1YcQDmd7Gom-mOGzB_j_oYD4qjR9M",
//   authDomain: "pushnotificationtest-9e21c.firebaseapp.com",
//   projectId: "pushnotificationtest-9e21c",
//   storageBucket: "pushnotificationtest-9e21c.appspot.com",
//   messagingSenderId: "1019872102596",
//   appId: "1:1019872102596:web:57ec3461348eca0ea1e191",
//   measurementId: "G-TFEDXNHVGY",
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
//       })
//       .catch(function (error) {
//         console.log("Error : ", error);
//       });
//   } else {
//     console.log("Unable to get permission to notify.");
//   }
// });

// messaging.onMessage(function (payload) {
//   console.log("onMessage : ", payload);
// });

// if (isIPhone) {
//   console.log("current device is mobile");
// } else {
//   console.log("current device is not mobile");
// }

function App() {
  return (
    <WrapBox id="app">
      {/* <BackGround /> */}

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
            <Route path="/notice" exact component={NoticePage} />
            <Route path="/test" exact component={Test} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <PlayBar />
          <Navigation></Navigation>
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
