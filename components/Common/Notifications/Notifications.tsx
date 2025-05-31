"use client";
import { MdOutlineNotificationsActive } from "react-icons/md";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import NotificationItem from "./NotificationItem";
import useNotifications from "@/components/Common/Notifications/useNotifications";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount } = useNotifications(); 

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 relative flex justify-center items-center gap-1.5 px-2 py-2 bg-white dark:bg-gray-700 border rounded-md">
        <MdOutlineNotificationsActive className="text-xl text-gray-600 dark:text-gray-300" />
        <span className="md:hidden">Notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1.5 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="gap-2 max-w-lg max-h-screen pl-2 pr-1 pt-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="px-5 mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Notifications
          </DialogTitle>
        </DialogHeader>

        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((notif, i) => (
            <div key={notif.id} className="flex flex-col gap-2">
              <NotificationItem notif={notif} />
              {i !== notifications.length - 1 && (
                <hr className="w-[90%] mx-auto" />
              )}
            </div>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Notifications;
