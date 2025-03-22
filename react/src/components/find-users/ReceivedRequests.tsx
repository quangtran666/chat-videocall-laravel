import { useState } from "react";
import {toast} from "sonner";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {Check, Clock, Users, X} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "../ui/badge";
import {Button } from "../ui/button";

function ReceivedRequests() {
    const [receivedRequests, setReceivedRequests] = useState([
        {
            id: "1",
            userId: "201",
            name: "Emma Wilson",
            username: "@emmaw",
            avatar: "/placeholder.svg?height=40&width=40",
            receivedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            mutualFriends: 3,
        },
        {
            id: "2",
            userId: "202",
            name: "Daniel Clark",
            username: "@danielc",
            avatar: "/placeholder.svg?height=40&width=40",
            receivedAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
            mutualFriends: 1,
        },
        {
            id: "3",
            userId: "203",
            name: "Sophia Rodriguez",
            username: "@sophiar",
            avatar: "/placeholder.svg?height=40&width=40",
            receivedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            mutualFriends: 0,
        },
    ])

    const handleAcceptRequest = (requestId: string) => {
        setReceivedRequests((prev) => prev.filter((request) => request.id !== requestId))
        toast.success("Friend request accepted")
    }

    const handleRejectRequest = (requestId: string) => {
        setReceivedRequests((prev) => prev.filter((request) => request.id !== requestId))
        toast.success("Friend request declined")
    }

    return (
        <div className="flex flex-col h-full">
            {/* The key fix is here - ensuring the ScrollArea has a fixed height or fills the remaining space */}
            <div className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                    {receivedRequests.length > 0 ? (
                        <div className="divide-y">
                            {receivedRequests.map((request) => (
                                <div key={request.id} className="p-4">
                                    <div className="flex items-start gap-3">
                                        <UserAvatar src={request.avatar} alt={request.name} />
                                        <div className="flex-1">
                                            <div className="font-medium">{request.name}</div>
                                            <div className="text-sm text-muted-foreground">{request.username}</div>
                                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                                <Clock className="mr-1 h-3 w-3" />
                                                Received {formatDistanceToNow(request.receivedAt, { addSuffix: true })}
                                            </div>

                                            {request.mutualFriends > 0 && (
                                                <div className="mt-2 flex items-center">
                                                    <Badge variant="outline" className="flex items-center gap-1">
                                                        <Users className="h-3 w-3" />
                                                        {request.mutualFriends} mutual {request.mutualFriends === 1 ? "friend" : "friends"}
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>
                                                <Check className="mr-1 h-4 w-4" />
                                                Accept
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={() => handleRejectRequest(request.id)}>
                                                <X className="mr-1 h-4 w-4" />
                                                Decline
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center p-8 text-center">
                            <div className="max-w-md">
                                <h3 className="mb-2 text-lg font-medium">No pending requests</h3>
                                <p className="text-sm text-muted-foreground">You don't have any friend requests at the moment.</p>
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    )
}

export default ReceivedRequests;