import React from "react";
import ReactDOM from "react-dom";
import App from "./shared/App";
//-- redux --
import { Provider } from "react-redux";
import store from "./redux/configureStore";

//-- serviceWorker --
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
//-- PWA --
import ReactPWAInstallProvider from "react-pwa-install";
// -- style --
import GlobalStyle from "./static/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./shared/theme";
import "./index.css";

//-- components --
import Device from "./shared/Device";

ReactDOM.render(
  <ReactPWAInstallProvider enableLogging>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Device>
          <GlobalStyle />
          <App />
        </Device>
      </ThemeProvider>
    </Provider>
  </ReactPWAInstallProvider>,

  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
