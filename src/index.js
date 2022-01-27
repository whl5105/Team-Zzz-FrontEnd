import React from "react";
import ReactDOM from "react-dom";
import App from "./shared/App";

// -- redux --
import { Provider } from "react-redux";
import store from "./redux/configureStore";

// -- serviceWorker --
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

// -- PWA --
import ReactPWAInstallProvider from "react-pwa-install";

// -- sentry --
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

// -- style --
import GlobalStyle from "./static/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./shared/theme";
import "./index.css";

// -- components --
import Device from "./shared/Device";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <ReactPWAInstallProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Device>
          <App />
        </Device>
      </ThemeProvider>
    </Provider>
  </ReactPWAInstallProvider>,

  document.getElementById("root")
);

reportWebVitals();
