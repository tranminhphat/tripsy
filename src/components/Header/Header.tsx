import * as React from "react";
import { useEffect, useState } from "react";
import BrandLogo from "./partials/BrandLogo";
import SearchBar from "./partials/SearchBar";
import UserOptions from "./partials/UserOptions";

interface Props {
  withSearchBar: boolean;
}

export const Header: React.FC<Props> = ({ withSearchBar }) => {
  const [isScrolled, setIsCrolled] = useState(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.addEventListener("scroll", listenToScroll);
  });

  const listenToScroll = () => {
    setIsCrolled(window.pageYOffset);
  };

  return (
    <header
      className={`h-20 w-full bg-white fixed top-0 left-0 z-50 ${
        isScrolled >= 10 ? "shadow-md " : ""
      }`}
    >
      <div className="container mx-auto h-full flex items-center grid grid-cols-4 lg:grid-cols-8">
        <div className="flex justify-start col-span-2">
          <BrandLogo />
        </div>
        <div className="hidden lg:flex flex-col justify-center h-full lg:col-span-4">
          {withSearchBar ? <SearchBar /> : null}
        </div>
        <div className="flex justify-end col-span-2">
          <UserOptions />
        </div>
      </div>
    </header>
  );
};
