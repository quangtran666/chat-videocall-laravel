import {Link} from "react-router";
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {Users} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const recentChats = [
    {id: "1", name: "Sarah Johnson", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", online: true, unread: 3},
    {id: "2", name: "Tech Team", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", group: true, unread: 0},
    {id: "3", name: "David Miller", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", online: false, unread: 0},
    {id: "4", name: "Marketing", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", group: true, unread: 5},
    {id: "4", name: "Marketing", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", group: true, unread: 5},
    {id: "4", name: "Marketing", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", group: true, unread: 5},
    {id: "4", name: "Marketing", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", group: true, unread: 5},
    {id: "4", name: "Marketing", avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg", group: true, unread: 5},
];

export function RecentChats() {
    return (
        <>
            <div className="px-4 text-xs font-semibold text-muted-foreground">Recent Chats</div>
            <ScrollArea className="h-[calc(100vh-380px)] px-2 py-2">
                {recentChats.map((chat) => (
                    <ChatItem chat={chat} />
                ))}
            </ScrollArea>
        </>
    )
}

interface ChatItemProps {
    chat: {
        id: string
        name: string
        avatar: string
        online?: boolean
        group?: boolean
        unread: number
    }
}

function ChatItem({ chat }: ChatItemProps) {
    return (
        <Link
            to={`/chats/${chat.id}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
        >
            <div className="relative">
                <UserAvatar src={chat.avatar} alt={chat.name} />
                {chat.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background" />
                )}
                {chat.group && (
                    <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground">
            <Users className="h-2 w-2" />
          </span>
                )}
            </div>
            <div className="flex-1 truncate">{chat.name}</div>
            {chat.unread > 0 && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {chat.unread}
                </div>
            )}
        </Link>
    )
}

export default RecentChats;