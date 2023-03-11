import { useQuery } from "@tanstack/react-query";
import React from "react";

const useReply = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["reply"],
    queryFn: () =>
      fetch(`http://localhost:4000/reply`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => res.json()),
  });
  return { data, isLoading, isError, error, refetch };
};

export default useReply;
