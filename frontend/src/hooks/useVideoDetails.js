import React from "react";
import { useQuery } from "@tanstack/react-query";
const useVideoDetails = ({ id }) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["videos", id],
    queryFn: () =>
      fetch(`http://localhost:4000/videos/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => res.json()),
  });

  const video = data?.data;

  return { video, isLoading };
};

export default useVideoDetails;
