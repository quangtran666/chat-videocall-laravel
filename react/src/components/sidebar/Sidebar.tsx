import {Link, useLocation} from "react-router";
import {useState} from "react";
import {LogOut, MessageSquare, PlusCircle, Search, Settings, Users} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import CreateRoomDialog from "@/components/chat/CreateRoomDialog.tsx";

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

function Sidebar() {
    const location = useLocation();
    const [createRoomOpen, setCreateRoomOpen] = useState(false);

    const recentChats = [
        {id: "1", name: "Sarah Johnson", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", online: true, unread: 3},
        {id: "2", name: "Tech Team", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", group: true, unread: 0},
        {id: "3", name: "David Miller", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", online: false, unread: 0},
        {id: "4", name: "Marketing", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", group: true, unread: 5},
    ];

    return (
        <div className="flex h-full w-64 flex-col border-r bg-background">
            <div className="flex h-14 items-center border-b px-4">
                <h1 className="text-lg font-semibold">Chat App</h1>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <Button onClick={() => setCreateRoomOpen(true)} className="w-full justify-start gap-2">
                    <PlusCircle className="h-4 w-4"/>
                    Create New Room
                </Button>
            </div>
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
            <Separator className="my-4"/>
            <div className="px-4 text-xs font-semibold text-muted-foreground">Recent Chats</div>
            <ScrollArea className="flex-1 px-2 py-2">
                {recentChats.map((chat) => (
                    <Link
                        key={chat.id}
                        to={`/chats/${chat.id}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                        <div className="relative">
                            <UserAvatar src={chat.avatar} alt={chat.name}/>
                            {chat.online && (
                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"/>
                            )}
                            {chat.group && (
                                <span
                                    className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground">
                                  <Users className="h-2 w-2"/>
                                </span>
                            )}
                        </div>
                        <div className="flex-1 truncate">{chat.name}</div>
                        {chat.unread > 0 && (
                            <div
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                {chat.unread}
                            </div>
                        )}
                    </Link>
                ))}
            </ScrollArea>
            <div className="mt-auto border-t p-4">
                <div className="flex items-center gap-3">
                    <UserAvatar src="https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg" alt="Your Name" />
                    <div>
                        <div className="text-sm font-medium">Your Name</div>
                        <div className="text-xs text-muted-foreground">Online</div>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto" aria-label="Log out">
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <CreateRoomDialog open={createRoomOpen} onOpenChange={setCreateRoomOpen} />
        </div>
    );
}

export default Sidebar;