import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface FPSNotification {
  id: string;
  title: string;
  message: string;
  sender: string;
  fpsId: string;
  status: "unread" | "read";
  formattedDate: string;
  priority: "High" | "Medium" | "Low";
  actionLink: string;
}

export default function useNotifications() {
  const [notifications, setNotifications] = useState<FPSNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { data: session } = useSession({ required: true });
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    // const newSocket = io(process.env.NEXT_PUBLIC_WS_URL!, {
    //   withCredentials: true,
    // });
    const token = session?.user?.token;

    if (!token) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      auth: { token },
      autoConnect: true,
    });

    setSocket(newSocket);
    newSocket.emit("join", session.user.id);

    // ✅ Listen for notifications update
    newSocket.on(
      "updatedNotifications",
      (updatedNotifications: FPSNotification[]) => {
        console.log(updatedNotifications);
        setNotifications(updatedNotifications);
      }
    );

    // ✅ Listen for unread count updates
    newSocket.on("unreadNotificationCount", (count: number) => {
      console.log(count);
      setUnreadCount(count);
    });

    // ✅ Clean up WebSocket on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [session?.user?.id]);
  console.log(notifications);
  return { notifications, unreadCount, setNotifications, setUnreadCount };
}

// "use client";
// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import { useSession, getSession } from "next-auth/react";
// import {
//   fetchNotifications,
//   fetchNotificationsUnreadCount,
// } from "@/utils/Api/fpsApi";

// export interface FPSNotification {
//   id: string;
//   title: string;
//   message: string;
//   sender: string;
//   fpsId: string;
//   status: "unread" | "read";
//   timestamp: string;
//   priority: "High" | "Medium" | "Low";
//   actionLink: string;
// }

// const useNotifications = () => {
//   const [notifications, setNotifications] = useState<FPSNotification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const { data: session } = useSession({ required: true });

//   useEffect(() => {
//     if (!session?.user?.id) return;

//     const fetchAndInitialize = async () => {
//       try {
//         // Fetch past notifications first
//         const oldNotifications = await fetchNotifications(
//           session.user.id || ""
//         );
//         setNotifications(oldNotifications || []);

//         // Fetch unread count on login
//         const notificationsUnreadCount = await fetchNotificationsUnreadCount(
//           session.user.id || ""
//         );
//         console.log(notificationsUnreadCount);
//         setUnreadCount(notificationsUnreadCount || 0);

//         // Get JWT token
//         const userSession = await getSession();
//         const token = userSession?.user?.token;

//         if (!token) return;

//         // Initialize socket
//         const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//           auth: { token },
//           autoConnect: true,
//         });

//         newSocket.on("newNotification", (notification: FPSNotification) => {
//           setNotifications((prev) => [notification, ...prev]);
//           setUnreadCount((prev) => prev + 1);
//         });

//         newSocket.on("unreadNotificationCount", (count: number) => {
//           setUnreadCount(count);
//         });

//         setSocket(newSocket);
//       } catch (error) {
//         console.error("Error setting up notifications:", error);
//       }
//     };

//     fetchAndInitialize();

//     return () => {
//       socket?.off("newNotification");
//       socket?.off("unreadNotificationCount");
//       socket?.disconnect();
//     };
//   }, [session?.user?.id]);

//   return { notifications, unreadCount };
// };

// export default useNotifications;

// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
// import authOptions from "@/lib/NextAuth/authOptions";

// export interface FPSNotification {
//   id: string;
//   title: string;
//   message: string;
//   sender: string;
//   fpsId: string;
//   status: "unread" | "read";
//   timestamp: string;
//   priority: "High" | "Medium" | "Low";
//   actionLink: string;
// }

// const useNotifications = () => {
//   const [notifications, setNotifications] = useState<FPSNotification[]>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const initializeSocket = async () => {
//       let token: string | null = null;

//       if (typeof window === "undefined") {
//         // Server-side (if this hook runs on server)
//         const session = await getServerSession(authOptions);
//         token = session?.user?.token || null;
//       } else {
//         // Client-side
//         const session = await getSession();
//         token = session?.user?.token || null;
//       }

//       const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//         auth: { token },
//         autoConnect: true,
//       });

//       newSocket.on("newNotification", (notification: FPSNotification) => {
//         setNotifications((prev) => [notification, ...prev]);
//       });

//       setSocket(newSocket);
//     };

//     initializeSocket();

//     return () => {
//       if (socket) {
//         socket.off("newNotification");
//         socket.disconnect();
//       }
//     };
//   }, []);

//   return { notifications };
// };

// export default useNotifications;

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// // import { FPSNotification } from "@/types/FPSNotification"; // Define a proper TypeScript type
// export interface FPSNotification {
//   id: string;
//   title: string;
//   message: string;
//   sender: string;
//   fpsId: string;
//   status: "unread" | "read";
//   timestamp: string; // ISO date string
//   priority: "High" | "Medium" | "Low";
//   actionLink: string;
// }
// const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//   auth: { token: localStorage.getItem("token") }, // Send JWT token for authentication
// });

// const useNotifications = () => {
//   const [notifications, setNotifications] = useState<FPSNotification[]>([]);

//   useEffect(() => {
//     socket.on("newNotification", (notification: FPSNotification) => {
//       setNotifications((prev) => [notification, ...prev]);
//     });

//     return () => {
//       socket.off("newNotification");
//     };
//   }, []);

//   return { notifications };
// };

// export default useNotifications;
