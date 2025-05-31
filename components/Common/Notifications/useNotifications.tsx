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
  const [, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const token = session?.user?.token;

    if (!token) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      auth: { token },
      autoConnect: true,
    });

    setSocket(newSocket);
    newSocket.emit("join", session.user.id);

    newSocket.on(
      "updatedNotifications",
      (updatedNotifications: FPSNotification[]) => {
        setNotifications(updatedNotifications);
      }
    );

    newSocket.on("unreadNotificationCount", (count: number) => {
      setUnreadCount(count);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [session?.user?.id]);
  return { notifications, unreadCount, setNotifications, setUnreadCount };
}
