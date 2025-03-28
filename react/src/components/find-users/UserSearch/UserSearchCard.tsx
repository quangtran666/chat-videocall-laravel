import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {UserAvatar} from "@/components/utils/UserAvatar";
import {Loader2, UserPlus} from "lucide-react";
import {useFriendAction} from "@/hooks/useUser.ts";

type UserCardProps = {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
    mutual_friends_count: number;
}

function UserSearchCard({id, name, email, avatar_url, mutual_friends_count}: UserCardProps) {
    const sendRequest = useFriendAction('send');

    const handleSendRequest = () => {
        sendRequest.mutate(id);
    }

    return (
        <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
                <div className="relative">
                    <UserAvatar src={avatar_url} alt={name}/>
                    <span
                        className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"/>
                </div>
                <div className="flex-1">
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-muted-foreground">{email}</div>
                    <p className="mt-1 text-sm">Bio</p>

                    <Badge variant="outline" className="mt-2">
                        {mutual_friends_count} mutual {mutual_friends_count === 1 ? "friend" : "friends"}
                    </Badge>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                {sendRequest.isPending ? (
                    <Button className="flex items-center" variant="outline" size="sm">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                        Sending...
                    </Button>
                ) : (
                    <Button size="sm" variant="outline" onClick={handleSendRequest}>
                        <UserPlus className="mr-1 h-4 w-4"/>
                        Connect
                    </Button>
                )}
            </div>
        </div>
    );
}

export default UserSearchCard;