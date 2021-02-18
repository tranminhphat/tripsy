import React from "react";

import { Header } from "./components/Header/Header";
import MyAlert from "./components/Shared/MyAlert";
import AppRouter from "./routes/index";

export const App: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Header />
      <div style={{ paddingTop: "96px" }}>
        <AppRouter />
        <MyAlert />
      </div>
    </div>
  );
};
