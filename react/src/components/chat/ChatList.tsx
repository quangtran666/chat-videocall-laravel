import {useState} from "react";
import {Search, Users} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Link} from "react-router";
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";

const chats = [
    {
        id: "1",
        name: "Sarah Johnson",
        avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg",
        lastMessage: "Are we still meeting tomorrow?",
        timestamp: "10:42 AM",
        online: true,
        unread: 3,
    },
    {
        id: "2",
        name: "Tech Team",
        avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg",
        lastMessage: "David: I just pushed the new update",
        timestamp: "Yesterday",
        group: true,
        unread: 0,
    },
    {
        id: "3",
        name: "David Miller",
        avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg",
        lastMessage: "Thanks for your help!",
        timestamp: "Yesterday",
        online: false,
        unread: 0,
    },
    {
        id: "4",
        name: "Marketing",
        avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg",
        lastMessage: "Emma: Let's finalize the campaign",
        timestamp: "Monday",
        group: true,
        unread: 5,
    },
    {
        id: "5",
        name: "Alex Thompson",
        avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg",
        lastMessage: "Can you send me that file?",
        timestamp: "Monday",
        online: true,
        unread: 0,
    },
    {
        id: "6",
        name: "Project Brainstorm",
        avatar: "https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg",
        lastMessage: "You: I think we should consider...",
        timestamp: "Last week",
        group: true,
        unread: 0,
    },
]

function ChatList() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="flex h-full flex-col">
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="Search conversations..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="space-y-1 p-2">
                    {filteredChats.map((chat) => (
                        <Link
                            key={chat.id}
                            to={`/chats/conversation/${chat.id}`}
                            className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent"
                        >
                            <div className="relative">
                                <UserAvatar src={chat.avatar} alt={chat.name}/>
                                {chat.online && (
                                    <span
                                        className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"/>
                                )}
                                {chat.group && (
                                    <span
                                        className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground">
                                    <Users className="h-2 w-2"/>
                                  </span>
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between">
                                    <div className="font-medium">{chat.name}</div>
                                    <div className="text-xs text-muted-foreground">{chat.timestamp}</div>
                                </div>
                                <div className="truncate text-sm text-muted-foreground">{chat.lastMessage}</div>
                            </div>
                            {chat.unread > 0 && (
                                <div
                                    className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                    {chat.unread}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default ChatList;