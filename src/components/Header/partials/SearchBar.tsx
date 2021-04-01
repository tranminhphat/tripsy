import SearchIcon from "@material-ui/icons/Search";
import * as React from "react";

interface Props {}

const SearchBar: React.FC<Props> = () => {
  return (
    <div className="flex items-center h-3/4 border border-solid border-gray-300 bg-gray-50 rounded-xl">
      <div className="ml-4 flex w-full">
        <div className="mr-2">
          <SearchIcon />
        </div>
        <input
          className="focus:outline-none bg-gray-50 w-full mr-4"
          type="text"
          placeholder="Bạn muốn đi đâu?"
        />
      </div>
    </div>
  );
};

export default SearchBar;
