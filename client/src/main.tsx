import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { store } from "./Store/store.ts";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import { MantineProvider } from "@mantine/core";
import theme from "./Assets/StyledData/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
