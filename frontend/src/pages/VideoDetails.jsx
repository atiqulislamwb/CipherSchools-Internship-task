import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import useVideoDetails from "../hooks/useVideoDetails";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineLike, AiFillLike, AiOutlineDislike } from "react-icons/ai";
import { HiScissors } from "react-icons/hi";
import { TbPlaylistAdd } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";

import useUser from "../hooks/useUser";
import { toast } from "react-hot-toast";
import useComments from "./../hooks/useComments";
import Comment from "../components/Comment";
import Loader from "../components/Loader";
import Share from "../components/Share";

const VideoDetails = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useUser();
  console.log(user);

  const { id } = useParams();
  const { video, isLoading, refetch: videoRefetch } = useVideoDetails({ id });
  const { data, isLoading: commentLoading, refetch } = useComments();
  //const [likes, setLikes] = useState(video?.likes);
  const handleComment = () => {
    const data = {
      videoId: video?._id,
      comment,
      author: user?.name,
      authorImage: user?.photoUrl,
      timestamp: new Date(),
      replies: [],
    };
    fetch(`https://cihpherschools.vercel.app/comments`, {
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

  const handleLike = () => {
    console.log("like");
    fetch(`https://cihpherschools.vercel.app/videos/${video._id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id }), // assuming you have a user ID
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          //setLikes(data.likes);
          toast.success("Video Liked");
          setIsLiked(true);
          videoRefetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDislike = () => {
    console.log("dislike");
    fetch(`https://cihpherschools.vercel.app/videos/${video._id}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id }), // assuming you have a user ID
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          //setLikes(data.likes);
          setIsLiked(false);
          videoRefetch();
          toast.success("Video Disliked");
        }
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="sm:p-5 overflow-y-auto mb-10 overflow-x-hidden ">
      <div className="flex w-full gap-4 sm:flex-row flex-col">
        <div className="w-full sm:w-9/12 ">
          <div className="hidden sm:block">
            <ReactPlayer
              className="w-full   sm:h-[60vh] "
              controls
              url={video?.url}
              width="100%"
              height="600px"
            />
          </div>
          <div className="sm:hidden block">
            <ReactPlayer
              className="w-full  "
              controls
              url={video?.url}
              width="100%"
              height="200px"
            />
          </div>
          <div className="w-full">
            <p className="font-bold text-xl m-2">{video?.title}</p>
            <div className="flex sm:flex-row flex-col sm:items-center justify-between mt-2">
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
              <div className="flex mt-3 sm:mt-0 flex-row flex-wrap items-center gap-4">
                <button
                  onClick={isLiked ? handleDislike : handleLike}
                  className="  hover:bg-gray-400 bg-gray-300 cursor-pointer text-black flex 
                 py-2 px-8 rounded-3xl items-center gap-2"
                >
                  {isLiked ? (
                    <AiFillLike size={22} />
                  ) : (
                    <AiOutlineLike size={22} />
                  )}

                  <span>{video?.likes?.length}</span>
                </button>
                <button className="hover:bg-gray-400 cursor-pointer flex items-center gap-2 bg-gray-300 text-black py-2 px-3 rounded-3xl">
                  <RiShareForwardLine size={22} />
                  <Share videoId={video?.url} />
                </button>

                <div
                  onClick={() => {
                    toast.success("video save and i implement this later");
                  }}
                  className=" hover:bg-gray-400 cursor-pointer flex items-center gap-2 bg-gray-300 text-black py-2 px-3 rounded-3xl"
                >
                  <TbPlaylistAdd size={22} />
                  <button>Save</button>
                </div>
                <div className=" hover:bg-gray-400 flex items-center gap-2 bg-gray-300 text-black py-2 px-2 rounded-3xl">
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
                        className="sm:w-[35vw] bg-[#F2F2F2] w-[230px] px-5 py-1 border-b-[1px] outline-none border-gray-700"
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
        <div className="hidden sm:block">Related videos</div>
      </div>
    </div>
  );
};

export default VideoDetails;
