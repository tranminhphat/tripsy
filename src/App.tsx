import React from "react";

import { Header } from "./components/Header/Header";
import MyAlert from "./components/Shared/MyAlert";
import AppRouter from "./routes/index";

export const App: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Header />
      <div className="container mx-auto" style={{ paddingTop: "96px" }}>
        <div className="my-16 mx-10">
          <AppRouter />
        </div>
        <MyAlert />
      </div>
    </div>
  );
};
