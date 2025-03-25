import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/NextAuth/authOptions";

export interface FPSNotification {
  id: string;
  title: string;
  message: string;
  sender: string;
  fpsId: string;
  status: "unread" | "read";
  timestamp: string;
  priority: "High" | "Medium" | "Low";
  actionLink: string;
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<FPSNotification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const initializeSocket = async () => {
      let token: string | null = null;

      if (typeof window === "undefined") {
        // Server-side (if this hook runs on server)
        const session = await getServerSession(authOptions);
        token = session?.user?.token || null;
      } else {
        // Client-side
        const session = await getSession();
        token = session?.user?.token || null;
      }

      const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
        auth: { token },
        autoConnect: true,
      });

      newSocket.on("newNotification", (notification: FPSNotification) => {
        setNotifications((prev) => [notification, ...prev]);
      });

      setSocket(newSocket);
    };

    initializeSocket();

    return () => {
      if (socket) {
        socket.off("newNotification");
        socket.disconnect();
      }
    };
  }, []);

  return { notifications };
};

export default useNotifications;

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
