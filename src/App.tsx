import React from "react";
import { Header } from "./components/Header";
import AppRouter from "./routes/index";

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
};
