import * as React from "react";
import BrandLogo from "./partials/BrandLogo";
import SearchBar from "./partials/SearchBar";
import UserOptions from "./partials/UserOptions";

interface Props {
  withSearchBar: boolean;
  setFilterObject?: any;
}

export const Header: React.FC<Props> = ({ withSearchBar, setFilterObject }) => {
  return (
    <header className="h-20 w-full bg-white fixed top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto h-full flex items-center grid grid-cols-4 lg:grid-cols-12">
        <div className="flex justify-start col-span-2">
          <BrandLogo />
        </div>
        <div className="hidden lg:flex flex-col ml-6 justify-center h-full lg:col-span-6">
          {withSearchBar ? (
            <SearchBar setFilterObject={setFilterObject} />
          ) : null}
        </div>
        <div className="flex justify-end col-span-4">
          <UserOptions />
        </div>
      </div>
    </header>
  );
};
