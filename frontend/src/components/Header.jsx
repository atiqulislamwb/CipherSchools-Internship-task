import React from "react";
import Search from "./Search";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
const Header = () => {
  return (
    <div>
      <div className="flex items-center">
        <div className="flex items-center gap-[50px]">
          <div className="flex items-center gap-6">
            <RiArrowLeftSLine color="#000" size={30} />
            <RiArrowRightSLine color="#94A3B8" size={30} />
          </div>
          <div>
            <Search />
          </div>
        </div>
        <div>user</div>
      </div>
    </div>
  );
};

export default Header;
