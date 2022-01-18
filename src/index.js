import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./shared/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import Device from "./components/Device";
import theme from "./shared/theme";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Device>
        <App />
      </Device>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// navigator.serviceWorker.register('service-worker.js')  //푸시알림 추가할지 안할지 테스트하면서 볼것
// .then(function(registration) {
//   return registration.pushManager.getSubscription()
//   .then(async function(subscription) {
//       // registration part
//   });
// })
// .then(function(subscription) {
//     // subscription part
//     if(subscription) {
//       return subscription;
//   }
// });
