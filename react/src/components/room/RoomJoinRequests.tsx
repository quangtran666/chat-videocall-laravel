import {Check, Clock, Loader2, X} from "lucide-react"
// import { toast } from "sonner"
import { ScrollArea } from "../ui/scroll-area"
import { UserAvatar } from "../utils/UserAvatar"
import { formatDistanceToNow } from "date-fns"
import { Button } from "../ui/button"

interface JoinRequest {
    id: string
    userId: string
    userName: string
    userAvatar: string
    roomId: string
    roomName: string
    requestedAt: Date
    status: "pending" | "accepted" | "rejected"
}

interface RoomJoinRequestsProps {
    requests: JoinRequest[]
    onAccept: (requestId: string) => void
    onReject: (requestId: string) => void
    isLoading?: boolean
}

export function RoomJoinRequests({ requests, onAccept, onReject, isLoading = false }: RoomJoinRequestsProps) {
    const pendingRequests = requests.filter((request) => request.status === "pending")

    if (pendingRequests.length === 0) {
        return (
            <div className="flex h-full items-center justify-center p-8 text-center">
                <div className="max-w-md">
                    <div className="bg-muted/30 rounded-full p-4 mx-auto w-fit mb-4">
                        <Clock className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No pending requests</h3>
                    <p className="text-sm text-muted-foreground">You don't have any pending room join requests at the moment.</p>
                </div>
            </div>
        )
    }

    return (
        <ScrollArea className="h-full">
            <div className="p-4 grid gap-4">
                {pendingRequests.map((request) => (
                    <div
                        key={request.id}
                        className="rounded-xl border p-4 bg-amber-50/50 dark:bg-amber-950/10 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-4">
                            <UserAvatar src={request.userAvatar} alt={request.userName} size="lg" />
                            <div className="flex-1">
                                <div className="font-medium text-lg">{request.userName}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <span>Wants to join</span>
                                    <span className="font-semibold text-foreground">{request.roomName}</span>
                                </div>
                                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    Requested {formatDistanceToNow(request.requestedAt, { addSuffix: true })}
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <Button
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                        onClick={() => onAccept(request.id)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                                        Accept
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => onReject(request.id)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <X className="mr-2 h-4 w-4" />}
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}