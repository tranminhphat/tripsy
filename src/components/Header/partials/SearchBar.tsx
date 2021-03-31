import SearchIcon from "@material-ui/icons/Search";
import * as React from "react";

interface Props {}

const SearchBar: React.FC<Props> = () => {
  return (
    <div className="flex items-center h-3/4 border border-solid border-gray-300 rounded-xl">
      <div className="ml-4 flex">
        <div className="mr-2">
          <SearchIcon />
        </div>
        <input
          className="focus:outline-none"
          type="text"
          placeholder="Bạn muốn đi đâu?"
        />
      </div>
    </div>
  );
};

export default SearchBar;
