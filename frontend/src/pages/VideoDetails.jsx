import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import useVideoDetails from "../hooks/useVideoDetails";

const VideoDetails = () => {
  const { id } = useParams();
  const { video, isLoading } = useVideoDetails({ id });
  return (
    <div className="p-5">
      <div className="flex w-full gap-4 flex-row">
        <div className="w-full sm:w-9/12">
          <ReactPlayer
            className="w-full sm:h-[60vh] h-[45vh]"
            controls
            url={video?.url}
            width="100%"
            height="600px"
          />
        </div>
        <div>Related videos</div>
      </div>
    </div>
  );
};

export default VideoDetails;
