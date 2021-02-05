import React from "react";
import { Header } from "./components/Header";
import AppRouter from "./routes/index";

export const App: React.FC = () => {
  return (
    <div className="bg-gray-100 h-screen w-full">
      <Header />
      <AppRouter />
    </div>
  );
};
