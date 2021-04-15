import { AlertProvider } from "contexts/AlertContext";
import { AuthProvider } from "contexts/AuthContext";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AlertProvider>
        <Router>
          <div style={{ fontFamily: "Arial, san-serif" }}>
            <App />
          </div>
        </Router>
      </AlertProvider>
    </AuthProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
