import React from "react";
import {
  AiOutlineHome,
  AiOutlinePlayCircle,
  AiOutlineHistory,
} from "react-icons/ai";
import { BsCollectionPlay } from "react-icons/bs";
import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <div className="p-2 h-[8vh] w-full">
      <div className="flex items-center  justify-around">
        <Link to="/" className="flex font-bold flex-col items-center">
          <AiOutlineHome size={25} />
          <p className="text-sm">Home</p>
        </Link>
        <Link to="/" className="flex font-bold flex-col items-center">
          <AiOutlinePlayCircle size={25} />
          <p className="text-sm">Shorts</p>
        </Link>
        <Link to="/" className="flex font-bold flex-col items-center">
          <BsCollectionPlay size={25} />
          <p className="text-sm">Subscription</p>
        </Link>
        <Link to="/" className="flex font-bold flex-col items-center">
          <AiOutlineHistory size={25} />
          <p className="text-sm">History</p>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
