import SearchIcon from "@material-ui/icons/Search";
import * as React from "react";

interface Props {}

const SearchBar: React.FC<Props> = () => {
  return (
    <div className="flex items-center justify-center h-3/4 border border-solid border-gray-300 rounded-2xl">
      <div className="flex flex-col justify-center w-5/12 h-full px-8">
        <label className="font-sans text-xs font-bold">Địa điểm</label>
        <input
          className="focus:outline-none"
          type="text"
          placeholder="Bạn muốn đi đâu?"
        />
      </div>
      <div className="w-0.5 h-8 border border-solid border-gray-300" />
      <div className="flex flex-col justify-center w-5/12 h-full px-8">
        <label className="font-sans text-xs font-bold">Thời gian</label>
        <input
          className="focus:outline-none"
          type="text"
          placeholder="Bạn muốn đi vào lúc nào?"
        />
      </div>
      <div className="flex flex-col justify-center w-2/12 h-full">
        <button className="focus:outline-none bg-main-blue w-full h-full rounded-2xl">
          <SearchIcon className="text-white" />
          <span style={{ fontFamily: "Lora" }} className="text-white">
            Tìm kiếm
          </span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
