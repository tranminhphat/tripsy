import { Header } from "components/Header/Header";
import MyAlert from "components/Shared/MyAlert";
import * as React from "react";

interface Props {
  withSearchBar?: boolean;
}

const MainLayout: React.FC<Props> = ({ withSearchBar = false, children }) => {
  return (
    <div className="h-full w-full">
      <Header withSearchBar={withSearchBar} />
      <div
        className="container mx-auto px-4"
        style={{ paddingTop: "96px", marginBottom: "24px" }}
      >
        <div>{children}</div>
        <MyAlert />
      </div>
    </div>
  );
};

export default MainLayout;
