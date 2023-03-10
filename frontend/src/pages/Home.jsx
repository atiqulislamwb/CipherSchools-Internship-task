import React from "react";
import VideoCard from "../components/VideoCard";
import useVideos from "../hooks/useVideos";

const Home = () => {
  const { data, isLoading } = useVideos();
  return (
    <div className="p-3">
      <div className="flex flex-wrap gap-6 mt-10">
        {data?.data?.map((video, i) => (
          <VideoCard video={video} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
