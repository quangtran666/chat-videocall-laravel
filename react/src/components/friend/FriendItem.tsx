import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Users} from "lucide-react";
import {ExtendedUserType} from "@/types/user/User.ts";

interface FriendItemProps {
    friend: ExtendedUserType
}

function FriendItem({friend}: FriendItemProps) {
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

            {/*<TooltipProvider>*/}
            {/*    <div className="flex items-center gap-1">*/}
            {/*        {onMessage && (*/}
            {/*            <Tooltip>*/}
            {/*                <TooltipTrigger asChild>*/}
            {/*                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onMessage}>*/}
            {/*                        <MessageSquare className="h-4 w-4" />*/}
            {/*                    </Button>*/}
            {/*                </TooltipTrigger>*/}
            {/*                <TooltipContent>Message</TooltipContent>*/}
            {/*            </Tooltip>*/}
            {/*        )}*/}

            {/*        {onViewProfile && (*/}
            {/*            <Tooltip>*/}
            {/*                <TooltipTrigger asChild>*/}
            {/*                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onViewProfile}>*/}
            {/*                        <User className="h-4 w-4" />*/}
            {/*                    </Button>*/}
            {/*                </TooltipTrigger>*/}
            {/*                <TooltipContent>View Profile</TooltipContent>*/}
            {/*            </Tooltip>*/}
            {/*        )}*/}

            {/*        <Tooltip>*/}
            {/*            <TooltipTrigger asChild>*/}
            {/*                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">*/}
            {/*                    <MoreHorizontal className="h-4 w-4" />*/}
            {/*                </Button>*/}
            {/*            </TooltipTrigger>*/}
            {/*            <TooltipContent>More Options</TooltipContent>*/}
            {/*        </Tooltip>*/}
            {/*    </div>*/}
            {/*</TooltipProvider>*/}
        </div>
    )
}

export default FriendItem;