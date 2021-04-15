import { AlertProvider } from "contexts/AlertContext";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import "./index.css";
import store from "./redux/store";

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <Router>
          <div style={{ fontFamily: "Arial, san-serif" }}>
            <App />
          </div>
        </Router>
      </AlertProvider>
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);
