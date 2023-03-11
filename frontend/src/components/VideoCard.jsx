import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const handViewsIncrease = (id) => {
    fetch(`https://cihpherschools.vercel.app/videos/${id}/view`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((video) => {
        console.log(`Video ${video._id} has ${video.views} views`);
      })
      .catch((error) => {
        console.error("Failed to update video views:", error);
      });
  };
  return (
    <Link
      className="animate-slide-up w-full sm:w-[350px] "
      to={`/videos/${video?._id}`}
      onClick={() => handViewsIncrease(video?._id)}
    >
      <img
        src={video?.thumbnail}
        alt={video?.title}
        className="sm:w-[350px]  sm:h-[200px] rounded-lg object-cover"
      />
      <div className="flex gap-3 mt-3">
        <div>
          <div className="w-10 h-10 object-fit rounded-full">
            <img
              src={video?.channel_thumbnail}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <div>
          <p className="text-sm sm:text-[16px]   font-bold">{video?.title}</p>
          <p className="hidden sm:block">{video?.channel}</p>
          <div className="sm:hidden  flex-row flex gap-3 items-center text-sm">
            <p>{video?.channel}</p>
            <p>{video?.views} views</p>
            <p className="w-1 h-1 rounded-full bg-gray-500"></p>
            <p>{video?.publishedAt} ago</p>
          </div>
          <div className="flex gap-3 mt-1 items-center">
            <p className="hidden sm:block">{video?.views} views</p>
            <p className="w-1 h-1 rounded-full bg-gray-500 hidden sm:block"></p>
            <p className="hidden sm:block">{video?.publishedAt} ago</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
