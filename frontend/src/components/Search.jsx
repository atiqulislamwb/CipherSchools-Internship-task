import React from "react";
import { BsSearch } from "react-icons/bs";
const Search = () => {
  return (
    <div class="pt-2 relative mx-auto text-gray-600">
      <input
        class="border border-gray-300 bg-[#F2F2F2] h-10 px-16 pr-16 rounded-2xl text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <div className="absolute top-[17px] mx-auto left-3 bottom-0">
        <BsSearch color="" className="text-xl" />
      </div>
      <button type="submit" class="absolute right-0 top-0 mt-5 mr-4"></button>
    </div>
  );
};

export default Search;
