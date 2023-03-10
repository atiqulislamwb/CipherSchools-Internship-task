import React from "react";
import { useQuery } from "@tanstack/react-query";
const useVideos = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["videos"],
    queryFn: () =>
      fetch(`http://localhost:4000/videos`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => res.json()),
  });
  return { data, isLoading, isError, error, refetch };
};

export default useVideos;
