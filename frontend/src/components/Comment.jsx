import React, { useState } from "react";
import moment from "moment";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import useUser from "../hooks/useUser";
import useReply from "./../hooks/useReply";
import { toast } from "react-hot-toast";
const Comment = ({ comment }) => {
  const { user } = useUser;
  const { data, isLoading, refetch } = useReply();
  const [toggle, setToggle] = useState(false);
  const [reply, setReply] = useState("");
  const [expandReply, setExpandReply] = useState(false);
  const time = moment(comment?.timestamp).format("LLL");
  // convert human-readable date to timestamp
  const myDate = new Date(time).getTime();

  // calculate time difference from current time
  const milliseconds = Date.now() - myDate;

  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  const timeString =
    (days > 0 ? days + " days " : "") +
    (hours > 0 ? hours + " hours " : "") +
    (minutes > 0 ? minutes + " minutes " : "") +
    (seconds > 0 ? seconds + " seconds" : "");

  const handleReply = (e) => {
    e.preventDefault();
    const data = {
      commentId: comment?._id,
      reply,
      authorImage: user?.photoUrl,
      timestamp: new Date(),
      author: user?.name,
    };

    fetch(`http://localhost:4000/reply`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success("Reply added successfully");
          refetch();
          setReply("");
        }
      });
  };
  const replies = data?.data?.filter((item) => item?.commentId == comment?._id);
  console.log(replies);
  return (
    <div>
      <div className="flex gap-2 mt-5">
        <div className="w-10 h-10 object-fit rounded-full">
          <img
            src={comment?.authorImage}
            alt={comment.author}
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="">
          <div className="flex gap-1 items-center">
            <p>{comment.author}</p>
            <p className="ml-3 text-sm">{timeString} ago</p>
          </div>
          <p>{comment.comment}</p>
          <div className="flex gap-3 items-center ml-3">
            <button className="">
              <AiOutlineLike size={22} />
            </button>
            <button>
              <AiOutlineDislike size={22} />
            </button>
            <button
              onClick={() => setToggle(!toggle)}
              className="text-sm font-bold"
            >
              Reply
            </button>
          </div>
          {toggle && (
            <div className="ml-8 mt-3 flex items-center gap-3">
              <div className="w-10 h-10 object-fit rounded-full">
                <img
                  src={comment?.authorImage}
                  alt={comment.author}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div>
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Add a comment"
                  className="sm:w-[35vw] bg-[#F2F2F2] w-[10vw] px-5 py-1 border-b-[1px] outline-none border-gray-700"
                />
                {
                  <div>
                    {reply !== "" && (
                      <div className="flex items-end justify-end mt-2 gap-2 ">
                        <button
                          onClick={() => setReply("")}
                          className="bg-gray-300 px-4 py-1 rounded-3xl"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleReply}
                          className="bg-black text-white px-4 py-1 rounded-3xl"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                }
              </div>
            </div>
          )}
          <button
            onClick={() => setExpandReply(!expandReply)}
            className="mt-2 rounded-xl hover:bg-[#DEF1FF] py-2 px-4 text-blue-500 text-sm "
          >
            {replies?.length > 0 ? `${replies?.length} Replies` : null}
          </button>
          {expandReply && (
            <div>
              {replies.map((item, i) => (
                <div className="flex gap-2 mt-3">
                  <div className="w-10 h-10 object-fit rounded-full">
                    <img
                      src={
                        item?.authorImage ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTD_qytX9Ikua6d7XiFxSQUwz5t7VCNpwo_tNdS8fC3g&s"
                      }
                      alt={item.author}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center">
                      <p>{item?.author || "Anonymous"}</p>
                      <p className="ml-3 text-sm">{timeString} ago</p>
                    </div>
                    <p>{item?.reply}</p>
                    <div className="flex gap-3 items-center ml-3">
                      <button className="">
                        <AiOutlineLike size={22} />
                      </button>
                      <button>
                        <AiOutlineDislike size={22} />
                      </button>
                      <button
                        onClick={() => setToggle(!toggle)}
                        className="text-sm font-bold"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
