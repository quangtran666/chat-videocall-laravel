import {MessageSquare, MoreHorizontal, Search, User, Users} from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import { UserAvatar } from "../utils/UserAvatar"
import { cn } from "@/lib/utils"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"

type Friend = {
    id: string
    name: string
    username: string
    avatar: string
    online: boolean
    mutualFriends: number
    lastActive?: string
}

type FriendsListProps = {
    friends: Friend[]
    onMessageFriend?: (friendId: string) => void
    onViewProfile?: (friendId: string) => void
}

export function FriendsList({ friends, onMessageFriend, onViewProfile }: FriendsListProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("all")

    // Filter friends based on search query
    const filteredFriends = friends.filter(
        (friend) =>
            friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Filter by online status for the "Online" tab
    const onlineFriends = filteredFriends.filter((friend) => friend.online)

    // Get the appropriate list based on active tab
    const displayedFriends = activeTab === "online" ? onlineFriends : filteredFriends

    return (
        <div className="flex h-full flex-col">
            <div className="border-b p-4">
                <h1 className="text-2xl font-bold">Friends</h1>
                <p className="text-sm text-muted-foreground">Connect and chat with your friends</p>
            </div>

            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search friends..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col min-h-0"
            >
                <div className="px-4 shrink-0 ">
                    <TabsList className="justify-start rounded-lg border-b-0 p-0">
                        <TabsTrigger
                            value="all"
                            className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                        >
                            All Friends
                            <Badge variant="secondary" className="ml-2">
                                {filteredFriends.length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                            value="online"
                            className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                        >
                            Online
                            <Badge variant="secondary" className="ml-2 bg-green-500 text-white">
                                {onlineFriends.length}
                            </Badge>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 overflow-hidden">
                    <TabsContent value="all" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
                        <FriendsListContent
                            friends={displayedFriends}
                            emptyMessage="No friends found"
                            emptyDescription={searchQuery ? "Try adjusting your search" : "Add some friends to get started"}
                            onMessageFriend={onMessageFriend}
                            onViewProfile={onViewProfile}
                        />
                    </TabsContent>

                    <TabsContent value="online" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
                        <FriendsListContent
                            friends={displayedFriends}
                            emptyMessage="No online friends"
                            emptyDescription={searchQuery ? "Try adjusting your search" : "Your friends are currently offline"}
                            onMessageFriend={onMessageFriend}
                            onViewProfile={onViewProfile}
                        />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

interface FriendsListContentProps {
    friends: Friend[]
    emptyMessage: string
    emptyDescription: string
    onMessageFriend?: (friendId: string) => void
    onViewProfile?: (friendId: string) => void
}

function FriendsListContent({friends, emptyMessage, emptyDescription, onMessageFriend, onViewProfile,}: FriendsListContentProps) {
    if (friends.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="bg-muted/30 rounded-full p-3 mb-3">
                    <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-lg">{emptyMessage}</p>
                <p className="text-sm text-muted-foreground mt-1">{emptyDescription}</p>
            </div>
        )
    }

    return (
        <ScrollArea className="h-full">
            <div className="divide-y">
                {friends.map((friend) => (
                    <FriendItem
                        key={friend.id}
                        friend={friend}
                        onMessage={onMessageFriend ? () => onMessageFriend(friend.id) : undefined}
                        onViewProfile={onViewProfile ? () => onViewProfile(friend.id) : undefined}
                    />
                ))}
            </div>
        </ScrollArea>
    )
}

interface FriendItemProps {
    friend: Friend
    onMessage?: () => void
    onViewProfile?: () => void
}

function FriendItem({ friend, onMessage, onViewProfile }: FriendItemProps) {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <UserAvatar src={friend.avatar} alt={friend.name} />
                    <span
                        className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-background",
                            friend.online ? "bg-green-500" : "bg-gray-400",
                        )}
                    />
                </div>
                <div>
                    <div className="font-medium">{friend.name}</div>
                    <div className="text-sm text-muted-foreground">{friend.username}</div>
                    <div className="flex items-center mt-1">
                        {friend.mutualFriends > 0 && (
                            <Badge variant="outline" className="text-xs font-normal">
                                <Users className="h-3 w-3 mr-1" />
                                {friend.mutualFriends} mutual {friend.mutualFriends === 1 ? "friend" : "friends"}
                            </Badge>
                        )}
                        {!friend.online && friend.lastActive && (
                            <span className="text-xs text-muted-foreground ml-2">Last active {friend.lastActive}</span>
                        )}
                    </div>
                </div>
            </div>

            <TooltipProvider>
                <div className="flex items-center gap-1">
                    {onMessage && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onMessage}>
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Message</TooltipContent>
                        </Tooltip>
                    )}

                    {onViewProfile && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onViewProfile}>
                                    <User className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Profile</TooltipContent>
                        </Tooltip>
                    )}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>More Options</TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </div>
    )
}

export default FriendsList;