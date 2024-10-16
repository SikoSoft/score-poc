import React from "react";
import ReactDOM from "react-dom/client";
import { MediatoolThemeProvider } from "@northlight/ui";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/store/";
import App from "../src/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MediatoolThemeProvider>
          <App />
        </MediatoolThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
);
