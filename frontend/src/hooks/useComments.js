import { useQuery } from "@tanstack/react-query";
import React from "react";

const useComments = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      fetch(`http://localhost:4000/comments`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => res.json()),
  });
  return { data, isLoading, isError, error, refetch };
};

export default useComments;
