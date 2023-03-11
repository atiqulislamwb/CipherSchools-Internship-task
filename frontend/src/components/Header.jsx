import React, { useState } from "react";
import Search from "./Search";
import { BsChatDots } from "react-icons/bs";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import useUser from "../hooks/useUser";
import useNotification from "../hooks/useNotification";
import Notification from "./Notification";

const Header = () => {
  const { user } = useUser();
  const { notifications } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-row items-center justify-between relative">
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
        <button
          className=" transition duration-300 ease-in-out"
          onClick={handleButtonClick}
        >
          <IoMdNotificationsOutline size={28} />
        </button>
        <button>
          <BsChatDots size={25} />
        </button>
        <img
          src={user?.photoUrl}
          className="w-10 h-10 object-cover rounded-full"
          alt="photo-of-user"
        />
      </div>
      {isOpen && (
        <div
          className="absolute top-full overflow-y-auto 
        right-7 w-[400px] h-[600px] bg-white
          rounded-lg shadow-lg animate-slide-up"
        >
          <div className="flex flex-col gap-3">
            <p className="p-3">Notification</p>
            <div>
              {notifications?.map((item, i) => (
                <Notification item={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
