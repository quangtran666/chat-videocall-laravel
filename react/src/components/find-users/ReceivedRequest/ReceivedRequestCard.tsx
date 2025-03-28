import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {Check, Clock, X} from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useFriendAction} from "@/hooks/useUser.ts";

type SentFriendCardProps = {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
    created_at: string;
    mutual_friends_count: number;
}

function ReceivedRequestCard({id, name, email, avatar_url, created_at, mutual_friends_count }: SentFriendCardProps) {
    const acceptRequest = useFriendAction('accept');
    const rejectRequest = useFriendAction('reject');

    const handleAcceptRequest = async () => {
        await acceptRequest.mutateAsync(id);
    }

    const handleRejectRequest = async () => {
        await rejectRequest.mutateAsync(id);
    }

    return (
        <div className="p-4">
            <div className="flex items-start gap-3">
                <UserAvatar src={avatar_url} alt={name}/>
                <div className="flex-1">
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-muted-foreground">{email}</div>
                    <Badge variant="outline" className="mt-2">
                        {mutual_friends_count} mutual {mutual_friends_count === 1 ? "friend" : "friends"}
                    </Badge>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3"/>
                        Sent {formatDistanceToNow(created_at, {addSuffix: true})}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        size="sm"
                        onClick={handleAcceptRequest}
                        disabled={acceptRequest.isPending}
                    >
                        <Check className="mr-1 h-4 w-4"
                    />
                        Accept
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleRejectRequest}
                        disabled={rejectRequest.isPending}
                    >
                        <X className="mr-1 h-4 w-4"/>
                        Decline
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ReceivedRequestCard;