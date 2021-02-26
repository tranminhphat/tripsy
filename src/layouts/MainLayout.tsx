import * as React from "react";
import { Header } from "components/Header/Header";
import MyAlert from "components/Shared/MyAlert";

interface Props {}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full w-full">
      <Header />
      <div className="container mx-auto" style={{ paddingTop: "96px" }}>
        <div className="my-16">{children}</div>
        <MyAlert />
      </div>
    </div>
  );
};

export default MainLayout;
