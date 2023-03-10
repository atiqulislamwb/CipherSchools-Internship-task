import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const handViewsIncrease = (id) => {
    fetch(`http://localhost:4000/videos/${id}/view`, { method: "PATCH" })
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
      className="animate-slideup w-full sm:w-[350px] "
      to={`/videos/${video?._id}`}
      onClick={() => handViewsIncrease(video?._id)}
    >
      <img
        src={video?.thumbnail}
        alt={video?.title}
        className="w-[350px] h-[200px] rounded-lg object-cover"
      />
      <div className="flex gap-3 mt-3">
        <div>
          <img
            src={video?.channel_thumbnail}
            alt={video?.title}
            className="w-12 h-12 object-fit rounded-full"
          />
        </div>
        <div>
          <p>{video.title}</p>
          <p>{video.channel}</p>
          <div className="flex gap-3 mt-1 items-center">
            <p>{video.views} views</p>
            <p className="w-1 h-1 rounded-full bg-gray-500"></p>
            <p>{video.publishedAt}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
