import React from "react";
import { useState } from "react";
import useUser from "../hooks/useUser";

const CommentForm = () => {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  return (
    <div className="flex gap-2">
      <div className="w-10 h-10 object-fit rounded-full">
        <img
          src={user?.photoUrl}
          alt=""
          className="w-full h-full rounded-full"
        />
      </div>
      <div>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full "
        />
      </div>
    </div>
  );
};

export default CommentForm;
