import React from "react";
import { useQuery } from "@tanstack/react-query";
const useVideoDetails = ({ id }) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["videos", id],
    queryFn: () =>
      fetch(`https://cihpherschools.vercel.app/videos/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => res.json()),
  });

  const video = data?.data;

  return { video, isLoading, refetch };
};

export default useVideoDetails;
