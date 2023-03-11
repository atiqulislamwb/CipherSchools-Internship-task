import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import useUser from "./useUser";

const useNotification = () => {
  const userId = "abcnefjhjfh";
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  //   const { data, isLoading, isError, error, refetch } = useQuery({
  //     queryKey: ["notifications",user?.id],
  //     queryFn: () =>
  //       fetch(  `http://localhost:4000/notifications/${user?.id}`, {
  //         method: "GET",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       }).then((res) => res.json()),
  //   });
  //   return { data, isLoading, isError, error, refetch };

  // };

  useEffect(() => {
    const newSocket = io("https://cihpherschools.vercel.app/", {
      transports: ["websocket", "polling"],
    });
    newSocket.on("connect", () => {
      console.log("Socket connected");
    });
    newSocket.on("notification", (data) => {
      console.log("New notification received:", data);
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
    });
    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `https://cihpherschools.vercel.app/notifications/${userId}`
        );
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, [userId]);

  return { notifications };
};

export default useNotification;
