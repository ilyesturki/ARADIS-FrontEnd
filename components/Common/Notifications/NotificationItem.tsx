import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";
import { markNotificationAsRead } from "@/utils/Api/fpsApi";
import useNotifications from "./useNotifications";

interface FPSNotification {
  id: string;
  title: string;
  message: string;
  sender: string;
  fpsId: string;
  status: "unread" | "read";
  formattedDate: string; // ISO date string
  priority: "High" | "Medium" | "Low";
  actionLink: string; // Direct link to FPS details
}

export default function NotificationItem({
  notif,
}: {
  notif: FPSNotification;
}) {
  const { setNotifications, setUnreadCount } = useNotifications();

  const handleMarkNotificationAsRead = async () => {
    if (notif.status === "unread") {
      await markNotificationAsRead(notif.id);

      // ✅ Update UI immediately
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, status: "read" } : n))
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <Card
      onClick={handleMarkNotificationAsRead}
      className={`flex items-start pl-4 rounded-md py-5 border-none ${
        notif.status === "unread"
          ? "bg-blueAccent bg-opacity-10 cursor-pointer"
          : ""
      }`}
    >
      <Bell className="text-greenAccent-900 mt-1" />
      <CardContent className="flex-1 pb-0 pl-5">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-greenAccent-900">{notif.title}</h4>
          <Badge
            variant={notif.priority === "High" ? "destructive" : "default"}
            className={`px-[7px] py-0.5 text-[11px] ${
              notif.priority === "High"
                ? "bg-redAccent-900"
                : "bg-greenAccent-800"
            }`}
          >
            {notif.priority}
          </Badge>
        </div>
        <p className="text-sm text-neutral-700 mt-1.5">{notif.message}</p>
        <div className="flex justify-between items-center mt-2.5">
          <small className="text-xs text-neutral-500">
            {new Date(notif.formattedDate).toLocaleString()}
          </small>
          <Link href={notif.actionLink}>
            <Button
              variant="link"
              className="p-0 text-xs font-medium text-greenAccent-900"
            >
              View FPS
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
