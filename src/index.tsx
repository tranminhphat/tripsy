import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div style={{ fontFamily: "Circular" }}>
        <App />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
