import {MessageSquare, Search, Settings, Users} from "lucide-react";
import {Link, useLocation} from "react-router";
import {cn} from "@/lib/utils.ts";

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
    },
    {
        path: "/find-users",
        label: "Find Users",
        icon: Search,
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
                    <route.icon className="h-4 w-4"/>
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}

export default SidebarNavigation;