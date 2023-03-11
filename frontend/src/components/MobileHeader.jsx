import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUser from "./../hooks/useUser";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import useNotification from "../hooks/useNotification";
import Notification from "./Notification";
const MobileHeader = () => {
  const { user } = useUser();
  const { notifications } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="px-4 pt-3 py-1 border-b border-gray-500 relative ">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/" className="mb-10 text-xl text-black font-bold">
            VID<span className="text-red-500">.MATE</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <p>
            <BsSearch size={22} />
          </p>
          <button onClick={handleButtonClick} className="">
            <IoMdNotificationsOutline size={26} />
          </button>
          {isOpen && (
            <div
              className="absolute top-full right-3 mt-2 w-[250px] 
            h-[400px] bg-white 
             rounded-lg shadow-md overflow-y-auto animate-slide-up"
            >
              <div>
                <p className="p-3">Notification</p>
                <div className="flex flex-col gap-2">
                  {notifications?.map((item, i) => (
                    <Notification item={item} key={i} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="w-8 h-8 object-fit rounded-full">
            <img
              src={user?.photoUrl}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
