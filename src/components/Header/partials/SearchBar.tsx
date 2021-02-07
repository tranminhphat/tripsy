import * as React from "react";
import SearchIcon from "@material-ui/icons/Search";

interface Props {}

export const SearchBar: React.FC<Props> = () => {
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
        <button className="focus:outline-none w-full h-full rounded-2xl bg-gradient-to-r from-green-400 to-green-700">
          <SearchIcon className="text-white" />
          <span className="text-white">Tìm kiếm</span>
        </button>
      </div>
    </div>
  );
};
