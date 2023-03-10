import React from "react";

const useUser = () => {
  //next i will implement it real user and authentication
  const user = {
    name: "Michael",
    photoUrl:
      "https://bestbuyerpersona.com/wp-content/uploads/2022/02/undraw_profile_pic_ic5t.png",

    email: "michael@gmail.com",
  };

  return { user };
};

export default useUser;
