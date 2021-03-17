import * as React from "react";
import BrandLogo from "./partials/BrandLogo";
import SearchBar from "./partials/SearchBar";
import UserOptions from "./partials/UserOptions";

interface Props {
  withSearchBar: boolean;
}

export const Header: React.FC<Props> = ({ withSearchBar }) => {
  return (
    <header className="h-24 w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full flex justify-between items-center">
        <div className="flex justify-center mb-1 mr-8">
          <BrandLogo />
        </div>
        {withSearchBar ? (
          <div className="hidden lg:flex flex-col justify-center h-full w-9/12 mx-8">
            <SearchBar />
          </div>
        ) : null}
        <div className="flex justify-center items-center ml-8">
          <UserOptions />
        </div>
      </div>
    </header>
  );
};
