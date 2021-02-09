import React from "react";
import { Header } from "./components/Header/Header";
import AppRouter from "./routes/index";

export const App: React.FC = () => {
  return (
    <div className="bg-gray-100 h-full w-full">
      <Header />
      <AppRouter />
    </div>
  );
};
