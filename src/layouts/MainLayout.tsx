import { Header } from "components/Header/Header";
import MyAlert from "components/Shared/MyAlert";
import * as React from "react";

interface Props {
  withSearchBar?: boolean;
}

const MainLayout: React.FC<Props> = ({ withSearchBar = true, children }) => {
  return (
    <div className="h-full w-full">
      <Header withSearchBar={withSearchBar} />
      <div className="container mx-auto" style={{ paddingTop: "96px" }}>
        <div className="my-8">{children}</div>
        <MyAlert />
      </div>
    </div>
  );
};

export default MainLayout;
