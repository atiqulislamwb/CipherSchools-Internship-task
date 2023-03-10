import React from "react";
import { BsBrowserEdge } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineLogout, AiOutlineWifi } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
import { BsDot, BsFillArrowDownCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="border-r border-[#A8A8A8] p-10 h-screen ">
      <div className="border-b border-gray-200">
        <Link to="/" className="mb-10 text-3xl text-black font-bold">
          VIDEO<span className="text-red-500">.MATE</span>
        </Link>
        <div className="mt-10">
          <p>News Feed</p>
          <div className="flex items-center gap-6 mt-5 ">
            <p>
              {" "}
              <BsBrowserEdge color="#8B1F19" />{" "}
            </p>
            <p>Browse</p>
          </div>
          <div className="flex items-center gap-6 mt-5">
            <p>
              {" "}
              <AiOutlineHeart color="#9A9A9A" />{" "}
            </p>
            <p>Watchlist</p>
          </div>
          <div className="flex items-center gap-6 mt-5 mb-5">
            <p>
              {" "}
              <GoCalendar color="#9A9A9A" />{" "}
            </p>
            <p>Coming Soon</p>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 ">
        <div className="mt-10">
          <p>Following</p>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2 w-7/12">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29uYXxlbnwwfHwwfHw%3D&w=1000&q=80"
              />
              <p>persona.t</p>
            </div>
            <p>
              <AiOutlineWifi color="#AD251E" />
            </p>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2 w-7/12">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src="https://images.healthshots.com/healthshots/en/uploads/2020/12/08182549/positive-person.jpg"
              />
              <p>emeliy.q</p>
            </div>
            <p>
              <BsDot color="#109F49" />
            </p>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2  w-7/12">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
              />
              <p>jhon.z</p>
            </div>
            <p>
              <BsDot color="#109F49" />
            </p>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2 w-7/12">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src="https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=7lrLYx-B"
              />
              <p>carley.k</p>
            </div>
            <p>
              <AiOutlineWifi color="#AD251E" />
            </p>
          </div>
          <div className="mt-10 mb-10">
            <div className="flex items-center gap-4">
              <BsFillArrowDownCircleFill color="#8E221B" size={28} />
              <p>Load more</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-24 flex items-center gap-6 ">
        <AiOutlineLogout size={30} color="#AD251E" />
        <p>Log Out</p>
      </div>
    </div>
  );
};

export default Sidebar;
