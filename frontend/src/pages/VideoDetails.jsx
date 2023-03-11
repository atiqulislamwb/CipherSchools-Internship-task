import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import useVideoDetails from "../hooks/useVideoDetails";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { HiScissors } from "react-icons/hi";
import { TbPlaylistAdd } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";

import useUser from "../hooks/useUser";
import { toast } from "react-hot-toast";
import useComments from "./../hooks/useComments";
import Comment from "../components/Comment";

const VideoDetails = () => {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { video, isLoading } = useVideoDetails({ id });
  const { data, isLoading: commentLoading, refetch } = useComments();
  const handleComment = () => {
    const data = {
      videoId: video?._id,
      comment,
      author: user?.name,
      authorImage: user?.photoUrl,
      timestamp: new Date(),
      replies: [],
    };
    fetch(`http://localhost:4000/comments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success("Comment added successfully");
          refetch();
          setComment("");
        }
      });
  };
  const filteredComments = data?.data?.filter(
    (item) => item?.videoId == video?._id
  );
  return (
    <div className="p-5 overflow-y-auto ">
      <div className="flex w-full gap-4 flex-row">
        <div className="w-full sm:w-9/12">
          <ReactPlayer
            className="w-full sm:h-[60vh] h-[45vh]"
            controls
            url={video?.url}
            width="100%"
            height="600px"
          />
          <div className="w-full">
            <p className="font-bold text-xl m-2">{video?.title}</p>
            <div className="flex flex-row items-center justify-between mt-2">
              <div className="flex gap-2">
                <div className="w-10 h-10 object-fit rounded-full">
                  <img
                    src={video?.channel_thumbnail}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="">
                  <p>{video?.channel}</p>
                  <p>230k subscribers</p>
                </div>
                <div className="ml-8">
                  <button className="bg-black text-white py-2 px-6 rounded-3xl">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="flex flex-row flex-wrap items-center gap-4">
                <div
                  className="bg-gray-300 text-black flex 
                 py-2 px-8 rounded-3xl items-center gap-2"
                >
                  <button className="border-r border-gray-500">
                    <AiOutlineLike size={22} />
                  </button>
                  <button>
                    <AiOutlineDislike size={22} />
                  </button>
                </div>
                <div className="flex items-center gap-2 bg-gray-300 text-black py-2 px-3 rounded-3xl">
                  <RiShareForwardLine size={22} />
                  <button>Share</button>
                </div>
                <div
                  title="clip"
                  className="flex items-center gap-2 bg-gray-300 text-black py-2 px-3 rounded-3xl"
                >
                  <HiScissors size={22} />
                  <button>Clip</button>
                </div>
                <div className="flex items-center gap-2 bg-gray-300 text-black py-2 px-3 rounded-3xl">
                  <TbPlaylistAdd size={22} />
                  <button>Save</button>
                </div>
                <div className="flex items-center gap-2 bg-gray-300 text-black py-2 px-2 rounded-3xl">
                  <BsThreeDots size={22} />
                </div>
              </div>
            </div>
            <div className="bg-gray-300 rounded-md mt-4 text-black p-2">
              <div className="flex items-center text-sm font-bold">
                <p className="mr-2">{video?.views} views</p>
                <p>{video?.publishedAt} ago</p>
              </div>
              <div>{video?.description}</div>
            </div>
            <div>
              <div className="flex items-center gap-3 mt-2 mb-2">
                <p>{filteredComments?.length} Comments</p>

                <div className="flex gap-1 items-center">
                  <BiMenuAltLeft size={25} />
                  <button>Sort by</button>
                </div>
              </div>
              <div className="w-full mt-4 mb-4">
                <div className="flex gap-3 w-full ">
                  <div className="w-10 h-10 object-fit rounded-full">
                    <img
                      src={user?.photoUrl}
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div>
                    <div>
                      <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment"
                        className="sm:w-[35vw] bg-[#F2F2F2] w-[10vw] px-5 py-1 border-b-[1px] outline-none border-gray-700"
                      />
                    </div>
                    <div>
                      {comment !== "" && (
                        <div className="flex items-end justify-end mt-2 gap-2 ">
                          <button
                            onClick={() => setComment("")}
                            className="bg-gray-300 px-4 py-1 rounded-3xl"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleComment}
                            className="bg-black text-white px-4 py-1 rounded-3xl"
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {filteredComments?.length > 0 &&
                  !commentLoading &&
                  filteredComments?.map((item, i) => (
                    <Comment comment={item} key={i} />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div>Related videos</div>
      </div>
    </div>
  );
};

export default VideoDetails;
