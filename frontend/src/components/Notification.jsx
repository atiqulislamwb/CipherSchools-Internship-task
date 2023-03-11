import React from "react";
import { Link } from "react-router-dom";

const Notification = ({ item }) => {
  return (
    <div className="hover:bg-gray-200 ">
      <Link>
        <div className="flex flex-row gap-2 p-3">
          <div className="sm:w-[20%] w-[32%]">
            <img
              src={item?.channel_thumbnail}
              alt=""
              className="sm:w-10 sm:h-10 w-8 h-8 object-fit rounded-full"
            />
          </div>

          <div>
            <p className="sm:text-[16px] text-[12px] ">{item?.title}</p>
          </div>
          <div>
            <div className="sm:w-[80px] w-[50px] h-10 sm:h-12 object-fit rounded-full">
              <img src={item?.thumbnail} alt="" className="w-full h-full " />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Notification;
