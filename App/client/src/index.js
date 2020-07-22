import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Store from "./store";
import { Provider } from "react-redux";
import { reconnect } from "./actions/app";
import AppRouter from "./routes/AppRouter";
import "bootstrap/dist/css/bootstrap.css";

const store = Store;

const last_session = localStorage.getItem("last_session");

if (last_session) {
  store.dispatch(reconnect(JSON.parse(last_session)));
}

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
