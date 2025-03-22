import {MessageSquare, Search, Settings, Users} from "lucide-react";
import {Link, useLocation} from "react-router";
import {cn} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";

// Mock data for pending friend requests count
const pendingFriendRequests = 3

// Mock data for pending room join requests count
const pendingRoomRequests = 2

const routes = [
    {
        path: "/chats",
        label: "Chats",
        icon: MessageSquare,
    },
    {
        path: "/rooms",
        label: "Rooms",
        icon: Users,
        badge: pendingRoomRequests > 0 ? pendingRoomRequests : undefined,
    },
    {
        path: "/find-users",
        label: "Find Users",
        icon: Search,
        badge: pendingFriendRequests > 0 ? pendingFriendRequests : undefined,
    },
    {
        path: "/settings",
        label: "Settings",
        icon: Settings,
    },
];

function SidebarNavigation() {
    const location = useLocation();

    return (
        <nav className="grid gap-1 px-2">
            {routes.map((route) => (
                <Link
                    key={route.path}
                    to={route.path}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        location.pathname === route.path ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                >
                    <span className="flex-1">{route.label}</span>
                    {route.badge && (
                        <Badge variant="default" className="h-5 min-w-5 px-1">
                            {route.badge}
                        </Badge>
                    )}
                </Link>
            ))}
        </nav>
    );
}

export default SidebarNavigation;