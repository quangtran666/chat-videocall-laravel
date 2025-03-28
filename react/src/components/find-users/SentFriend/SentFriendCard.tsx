import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {Clock, X} from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import { useFriendAction } from "@/hooks/useUser";

type SentFriendCardProps = {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
    created_at: string;
    mutual_friends_count: number;
}

function SentFriendCard({id, name, email, avatar_url, created_at, mutual_friends_count }: SentFriendCardProps) {
    const cancelRequest = useFriendAction('cancel');

    const handleCancelRequest = async () => {
        await cancelRequest.mutateAsync(id);
    }

    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
                <UserAvatar src={avatar_url} alt={name}/>
                <div>
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
            </div>
            <Button
                size="sm"
                variant="outline"
                onClick={handleCancelRequest}
                disabled={cancelRequest.isPending}
            >
                <X className="mr-1 h-4 w-4"/>
                Cancel
            </Button>
        </div>
    );
}

export default SentFriendCard;