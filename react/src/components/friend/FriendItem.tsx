import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {MessageSquare, MoreHorizontal, Phone, Users, Video} from "lucide-react";
import {ExtendedUserType} from "@/types/user/User.ts";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {useCreateConversation} from "@/hooks/useConversation.ts";

interface FriendItemProps {
    friend: ExtendedUserType
}

function FriendItem({friend}: FriendItemProps) {
    const createConversationMutation = useCreateConversation();

    async function handleStartChat() {
        await createConversationMutation.mutateAsync(friend.id)
    }

    return (
        <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <UserAvatar src={friend.avatar_url} alt={friend.name}/>
                    <span
                        // className={cn(
                        //     "absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-background",
                        //     friend.online ? "bg-green-500" : "bg-gray-400",
                        // )}
                        className="absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-background bg-green-500"
                    />
                </div>
                <div>
                    <div className="font-medium">{friend.name}</div>
                    <div className="text-sm text-muted-foreground">{friend.name}</div>
                    <div className="flex items-center mt-1">
                        {friend.mutual_friends_count! > 0 && (
                            <Badge variant="outline" className="text-xs font-normal">
                                <Users className="h-3 w-3 mr-1"/>
                                {friend.mutual_friends_count} mutual {friend.mutual_friends_count === 1 ? "friend" : "friends"}
                            </Badge>
                        )}
                        {/*{!friend.online && friend.lastActive && (*/}
                        {/*    <span className="text-xs text-muted-foreground ml-2">Last active {friend.lastActive}</span>*/}
                        {/*)}*/}
                        <span className="text-xs text-muted-foreground ml-2">Last active temp</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    size="icon"
                    onClick={handleStartChat}
                    disabled={createConversationMutation.isPending}
                    className="cursor-pointer"
                >
                    <MessageSquare className="h-5 w-5" />
                </Button>
                <Button size="icon" className="cursor-pointer">
                    <Phone className="h-5 w-5" />
                </Button>
                <Button size="icon" className="cursor-pointer">
                    <Video className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Block User</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove Friend</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default FriendItem;