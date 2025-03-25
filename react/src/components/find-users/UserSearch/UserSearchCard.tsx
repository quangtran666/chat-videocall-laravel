import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/utils/UserAvatar";
import {Check, UserPlus, X } from "lucide-react";
import { toast } from "sonner";
import {useState} from "react";

type UserCardProps = {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
    mutual_friends_count: number;
}

function UserSearchCard({name, email, avatar_url, mutual_friends_count }: UserCardProps) {
    const [status, setStatus] = useState<"none" | "sent" | "friends">("none");

    const handleSendRequest = () => {
        if (status === "none") {
            setStatus("sent");
            toast.success("Friend request sent");
        } else if (status === "sent") {
            setStatus("none");
            toast.success("Friend request canceled");
        }
    };

    return (
        <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
                <div className="relative">
                    <UserAvatar src={avatar_url} alt={name} />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background" />
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
                {status === "none" && (
                    <Button size="sm" variant="outline" onClick={handleSendRequest}>
                        <UserPlus className="mr-1 h-4 w-4" />
                        Connect
                    </Button>
                )}

                {status === "sent" && (
                    <Button size="sm" variant="outline" onClick={handleSendRequest}>
                        <X className="mr-1 h-4 w-4" />
                        Cancel Request
                    </Button>
                )}

                {status === "friends" && (
                    <Button size="sm" variant="ghost" disabled>
                        <Check className="mr-1 h-4 w-4" />
                        Connected
                    </Button>
                )}
            </div>
        </div>
    );
}

export default UserSearchCard;