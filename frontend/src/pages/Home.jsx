import React from "react";
import Loader from "../components/Loader";
import VideoCard from "../components/VideoCard";
import useVideos from "../hooks/useVideos";

const Home = () => {
  const { data, isLoading } = useVideos();
  if (isLoading) return <Loader />;
  return (
    <div className="p-3 overflow-y-auto">
      <div className="flex flex-wrap gap-6 sm:mt-10 mb-12 sm:mb-2">
        {data?.data?.map((video, i) => (
          <VideoCard video={video} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
