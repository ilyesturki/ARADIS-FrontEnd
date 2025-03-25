"use client";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import NotificationItem from "./NotificationItem";
import useNotifications from "@/hooks/useNotifications";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications } = useNotifications(); // ✅ Fetch real-time notifications

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-1.5 px-2 py-2 bg-white dark:bg-gray-700 border rounded-md">
        <MdOutlineNotificationsActive className="text-xl text-gray-600 dark:text-gray-300" />
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-screen pl-2 pr-0 pt-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="px-5 mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Notifications
          </DialogTitle>
        </DialogHeader>

        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((notif, i) => (
            <div key={notif.id}>
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

// "use client";
// import { MdOutlineNotificationsActive } from "react-icons/md";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { useState } from "react";
// import NotificationItem from "./NotificationItem";

// interface FPSNotification {
//   id: string;
//   title: string;
//   message: string;
//   sender: string;
//   fpsId: string;
//   status: "unread" | "read";
//   timestamp: string; // ISO date string
//   priority: "High" | "Medium" | "Low";
//   actionLink: string; // Direct link to FPS details
// }

// const exampleNotifications: FPSNotification[] = [
//   {
//     id: "notif-1234",
//     title: "New FPS assigned",
//     message: "FPS #204 assigned to you by Najar Anas. Please review it.",
//     sender: "Najar Anas",
//     fpsId: "fps-204",
//     status: "unread",
//     timestamp: "2025-03-24T12:45:00Z",
//     priority: "Medium",
//     actionLink: "/fps/204",
//   },
//   {
//     id: "notif-1235",
//     title: "FPS Updated",
//     message: "FPS #198 has been updated by Manita Ghaith. Check the changes.",
//     sender: "Manita Ghaith",
//     fpsId: "fps-198",
//     status: "unread",
//     timestamp: "2025-03-23T09:30:00Z",
//     priority: "Low",
//     actionLink: "/fps/198",
//   },
//   {
//     id: "notif-1236",
//     title: "Deadline Approaching",
//     message: "URGENT: FPS #150 deadline is today! Immediate action required.",
//     sender: "System",
//     fpsId: "fps-150",
//     status: "unread",
//     timestamp: "2025-03-24T07:00:00Z",
//     priority: "High",
//     actionLink: "/fps/150",
//   },
//   {
//     id: "notif-1237",
//     title: "FPS Closed",
//     message: "FPS #178 has been successfully resolved by Turki Ilyes.",
//     sender: "Turki Ilyes",
//     fpsId: "fps-178",
//     status: "read",
//     timestamp: "2025-03-22T15:20:00Z",
//     priority: "Low",
//     actionLink: "/fps/178",
//   },
//   {
//     id: "notif-1238",
//     title: "Pending FPS Reminder",
//     message: "You have 3 pending FPS actions. Please check them.",
//     sender: "System",
//     fpsId: "",
//     status: "unread",
//     timestamp: "2025-03-21T10:15:00Z",
//     priority: "Medium",
//     actionLink: "/fps",
//   },
// ];

// const Notifications = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger
//         onClick={() => setIsOpen(true)}
//         className="flex items-center gap-1.5 px-2 py-2 bg-white dark:bg-gray-700 border rounded-md"
//       >
//         <MdOutlineNotificationsActive className="text-xl text-gray-600 dark:text-gray-300" />
//       </DialogTrigger>
//       <DialogContent className="max-w-lg max-h-screen pl-2 pr-0 pt-6 overflow-y-auto dialogScroll">
//         <DialogHeader>
//           <DialogTitle className="px-5 mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-300">
//             Notifications
//           </DialogTitle>
//         </DialogHeader>

//         {exampleNotifications.map((notif, i) => (
//           <div key={notif.id}>
//             <NotificationItem notif={notif} />
//             {i !== exampleNotifications.length - 1 && (
//               <hr className="w-[90%] mx-auto" />
//             )}
//           </div>
//         ))}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Notifications;
