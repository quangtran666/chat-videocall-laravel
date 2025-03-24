import {useState} from "react";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../utils/UserAvatar";
import { Clock, X } from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import { Button } from "../ui/button";
import {useGetSentFriendRequests} from "@/hooks/useUser.ts";

function SentRequests() {
    const {data: friendRequests } = useGetSentFriendRequests();

    const [sentRequests, setSentRequests] = useState([
        {
            id: "1",
            userId: "101",
            name: "Alex Thompson",
            username: "@alext",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        },
        {
            id: "2",
            userId: "102",
            name: "Jessica Lee",
            username: "@jessical",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        },
        {
            id: "3",
            userId: "103",
            name: "Ryan Martinez",
            username: "@ryanm",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
            id: "3",
            userId: "103",
            name: "Ryan Martinez",
            username: "@ryanm",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
            id: "3",
            userId: "103",
            name: "Ryan Martinez",
            username: "@ryanm",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
            id: "3",
            userId: "103",
            name: "Ryan Martinez",
            username: "@ryanm",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
            id: "3",
            userId: "103",
            name: "Ryan Martinez",
            username: "@ryanm",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
            id: "3",
            userId: "103",
            name: "Ryan Martinez",
            username: "@ryanm",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
            id: "3",
            userId: "103",
            name: "Ryan Martinez",
            username: "@ryanm",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
            id: "3",
            userId: "103",
            name: "Ryan Martinez",
            username: "@ryanm",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
            id: "3",
            userId: "103",
            name: "Ryan Martinez",
            username: "@ryanm",
            avatar: "/placeholder.svg?height=40&width=40",
            sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
    ])

    const handleCancelRequest = (requestId: string) => {
        setSentRequests((prev) => prev.filter((request) => request.id !== requestId))
        toast.success("Request canceled")
    }

    return (
        <div className="flex flex-col h-full">
            {/* The key fix is here - ensuring the ScrollArea has a fixed height or fills the remaining space */}
            <div className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                    {sentRequests.length > 0 ? (
                        <div className="divide-y">
                            {sentRequests.map((request) => (
                                <div key={request.id} className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-3">
                                        <UserAvatar src={request.avatar} alt={request.name} />
                                        <div>
                                            <div className="font-medium">{request.name}</div>
                                            <div className="text-sm text-muted-foreground">{request.username}</div>
                                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                                <Clock className="mr-1 h-3 w-3" />
                                                Sent {formatDistanceToNow(request.sentAt, { addSuffix: true })}
                                            </div>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" onClick={() => handleCancelRequest(request.id)}>
                                        <X className="mr-1 h-4 w-4" />
                                        Cancel
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center p-8 text-center">
                            <div className="max-w-md">
                                <h3 className="mb-2 text-lg font-medium">No pending requests</h3>
                                <p className="text-sm text-muted-foreground">
                                    You haven't sent any friend requests yet. Find users to connect with in the search tab.
                                </p>
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    )
}

export default SentRequests;