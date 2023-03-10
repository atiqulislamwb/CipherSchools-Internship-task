import React from "react";
import Search from "./Search";
import { BsChatDots } from "react-icons/bs";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import useUser from "../hooks/useUser";
const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-[50px]">
        <div className="flex items-center gap-6">
          <RiArrowLeftSLine color="#000" size={30} />
          <RiArrowRightSLine color="#94A3B8" size={30} />
        </div>
        <div>
          <Search />
        </div>
      </div>
      <div className="flex items-center gap-6 mr-10">
        <p>
          <IoMdNotificationsOutline size={28} />
        </p>
        <p>
          <BsChatDots size={25} />
        </p>
        <img
          src={user?.photoUrl}
          className="w-10 h-10 object-cover rounded-full"
          alt="photo-of-user"
        />
      </div>
    </div>
  );
};

export default Header;
