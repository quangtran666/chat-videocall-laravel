import { useState } from "react";
import  NotificationCenter, { type Notification } from "../utils/NotificationCenter";

function UtilsButton() {
    // Mock notifications state
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "notif1",
            title: "Join Request Approved",
            message: "Your request to join Photography Club has been approved.",
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            read: false,
            type: "success",
            actionUrl: "/rooms/7",
            actionLabel: "Join Now",
        },
        {
            id: "notif2",
            title: "New Join Request",
            message: "Emma Wilson wants to join Design Team.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            read: true,
            type: "info",
            actionUrl: "/rooms?tab=requests",
            actionLabel: "Review",
        },
        {
            id: "notif3",
            title: "Request Declined",
            message: "Your request to join Private Developers Group was declined.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
            read: false,
            type: "error",
            actionUrl: "/rooms",
            actionLabel: "Browse Rooms",
        },
        {
            id: "notif4",
            title: "New Message",
            message: "You have a new message from Sarah in Tech Team.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            read: false,
            type: "info",
            actionUrl: "/chats/2",
            actionLabel: "View Chat",
        },
        {
            id: "notif4",
            title: "New Message",
            message: "You have a new message from Sarah in Tech Team.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            read: false,
            type: "info",
            actionUrl: "/chats/2",
            actionLabel: "View Chat",
        },
        {
            id: "notif5",
            title: "System Maintenance",
            message: "The chat service will be down for maintenance tomorrow from 2-4 AM.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
            read: true,
            type: "warning",
        },
    ])

    // Handle notification actions
    const handleMarkAsRead = (id: string) => {
        setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    }

    return (
        <div className="ml-auto flex items-center gap-1">
            <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
            />
        </div>
    );
}

export default UtilsButton;