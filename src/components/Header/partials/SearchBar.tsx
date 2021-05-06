import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import * as React from "react";
import { useState } from "react";

interface Props {
  setFilterObject: any;
}

const SearchBar: React.FC<Props> = ({ setFilterObject }) => {
  const [value, setValue] = useState<string>();
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleOnSearch = () => {
    if (value !== "") {
      setFilterObject({ title: value });
    } else {
      setFilterObject({ title: null });
    }
  };

  return (
    <div className="flex items-center h-3/4 border border-solid border-gray-300 bg-gray-50 rounded-xl">
      <div className="ml-4 flex justify-between w-full">
        <input
          value={value}
          onChange={handleChange}
          className="focus:outline-none bg-gray-50 w-full ml-2"
          type="text"
          placeholder="Tìm kiếm theo tên trải nghiệm"
        />
        <div className="mr-2">
          <IconButton onClick={handleOnSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
