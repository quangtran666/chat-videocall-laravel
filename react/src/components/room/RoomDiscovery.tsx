import {Globe, Search, Lock, Users, UserCheck, Clock, CheckCircle, XCircle, UserPlus} from "lucide-react";
import {useEffect, useState} from "react";
import { Input } from "../ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { toast } from "sonner"
import { cn } from "@/lib/utils";
import {RoomJoinRequests} from "@/components/room/RoomJoinRequests.tsx";

// Define room join request type
interface RoomJoinRequest {
    id: string
    userId: string
    userName: string
    userAvatar: string
    roomId: string
    roomName: string
    requestedAt: Date
    status: "pending" | "accepted" | "rejected"
}

// Define room type with additional fields
interface Room {
    id: string
    name: string
    description: string
    members: number
    category: string
    isPrivate: boolean
    joined: boolean
    joinRequestStatus?: "pending" | "accepted" | "rejected"
    isOwner?: boolean
}

export function RoomDiscovery() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([])

    // Mock user ID - in a real app, this would come from authentication
    const currentUserId = "current-user"

    // Mock rooms data with additional fields
    const [rooms, setRooms] = useState<Room[]>([
        {
            id: "1",
            name: "Tech Discussion",
            description: "Talk about the latest in technology",
            members: 128,
            category: "Technology",
            isPrivate: false,
            joined: true,
            isOwner: false,
        },
        {
            id: "2",
            name: "Gaming Lounge",
            description: "For gamers to connect and chat",
            members: 256,
            category: "Gaming",
            isPrivate: false,
            joined: false,
        },
        {
            id: "3",
            name: "Book Club",
            description: "Discuss your favorite books",
            members: 64,
            category: "Books",
            isPrivate: false,
            joined: true,
            isOwner: false,
        },
        {
            id: "4",
            name: "Design Team",
            description: "Private room for design team members",
            members: 12,
            category: "Design",
            isPrivate: true,
            joined: true,
            isOwner: true,
        },
        {
            id: "5",
            name: "Music Lovers",
            description: "Share and discuss music",
            members: 189,
            category: "Music",
            isPrivate: false,
            joined: false,
        },
        {
            id: "6",
            name: "Fitness Group",
            description: "Tips and motivation for fitness",
            members: 97,
            category: "Health",
            isPrivate: true,
            joined: false,
            joinRequestStatus: "pending",
        },
        {
            id: "7",
            name: "Photography Club",
            description: "Share and discuss photography",
            members: 145,
            category: "Photography",
            isPrivate: true,
            joined: false,
            joinRequestStatus: "accepted",
        },
        {
            id: "8",
            name: "Cooking Club",
            description: "Share recipes and cooking tips",
            members: 112,
            category: "Food",
            isPrivate: true,
            joined: false,
            joinRequestStatus: "rejected",
        },
    ])

    // Mock join requests data
    const [joinRequests, setJoinRequests] = useState<RoomJoinRequest[]>([
        {
            id: "req1",
            userId: "user1",
            userName: "Alex Johnson",
            userAvatar: "/placeholder.svg?height=40&width=40",
            roomId: "4",
            roomName: "Design Team",
            requestedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            status: "pending",
        },
        {
            id: "req2",
            userId: "user2",
            userName: "Emma Wilson",
            userAvatar: "/placeholder.svg?height=40&width=40",
            roomId: "4",
            roomName: "Design Team",
            requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            status: "pending",
        },
    ])

    const filteredRooms = rooms.filter(
        (room) =>
            room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const joinedRooms = filteredRooms.filter((room) => room.joined)
    const discoverRooms = filteredRooms.filter((room) => !room.joined)
    const ownedRooms = filteredRooms.filter((room) => room.isOwner)

    // Get pending requests for rooms the user owns
    const pendingRequests = joinRequests.filter(
        (request) => request.status === "pending" && ownedRooms.some((room) => room.id === request.roomId),
    )

    // Handle room join request
    const handleJoinRequest = (roomId: string) => {
        setIsProcessing(true)

        // Simulate API call
        setTimeout(() => {
            // Update room status
            setRooms(rooms.map((room) => (room.id === roomId ? { ...room, joinRequestStatus: "pending" } : room)))

            // Add notification for the room owner (in a real app, this would be sent to the owner)
            const room = rooms.find((r) => r.id === roomId)
            if (room) {
                // In a real app, this would be a server-side notification to the room owner
                console.log(`Join request sent to room: ${room.name}`)

                // Add notification for the current user
                addNotification({
                    id: `notif-${Date.now()}`,
                    title: "Join Request Sent",
                    message: `Your request to join ${room.name} has been sent and is pending approval.`,
                    timestamp: new Date(),
                    read: false,
                    type: "info",
                })
            }

            setIsProcessing(false)

            toast("Join request sent")
        }, 1000)
    }

    // Handle accepting a join request
    const handleAcceptRequest = (requestId: string) => {
        setIsProcessing(true)

        // Simulate API call
        setTimeout(() => {
            const request = joinRequests.find((req) => req.id === requestId)
            if (request) {
                // Update request status
                setJoinRequests(joinRequests.map((req) => (req.id === requestId ? { ...req, status: "accepted" } : req)))

                // In a real app, this would be a server-side notification to the requester
                console.log(`Join request accepted for user: ${request.userName} to room: ${request.roomName}`)

                // Add notification for the current user (room owner)
                addNotification({
                    id: `notif-${Date.now()}`,
                    title: "Request Approved",
                    message: `You approved ${request.userName}'s request to join ${request.roomName}.`,
                    timestamp: new Date(),
                    read: false,
                    type: "success",
                })
            }

            setIsProcessing(false)

            toast("Request accepted")
        }, 1000)
    }

    // Handle rejecting a join request
    const handleRejectRequest = (requestId: string) => {
        setIsProcessing(true)

        // Simulate API call
        setTimeout(() => {
            const request = joinRequests.find((req) => req.id === requestId)
            if (request) {
                // Update request status
                setJoinRequests(joinRequests.map((req) => (req.id === requestId ? { ...req, status: "rejected" } : req)))

                // In a real app, this would be a server-side notification to the requester
                console.log(`Join request rejected for user: ${request.userName} to room: ${request.roomName}`)

                // Add notification for the current user (room owner)
                addNotification({
                    id: `notif-${Date.now()}`,
                    title: "Request Declined",
                    message: `You declined ${request.userName}'s request to join ${request.roomName}.`,
                    timestamp: new Date(),
                    read: false,
                    type: "info",
                })
            }

            setIsProcessing(false)

            toast("Request declined")
        }, 1000)
    }

    // Handle joining a room after request is accepted
    const handleJoinRoom = (roomId: string) => {
        setIsProcessing(true)

        // Simulate API call
        setTimeout(() => {
            // Update room status to joined
            setRooms(
                rooms.map((room) => (room.id === roomId ? { ...room, joined: true, joinRequestStatus: undefined } : room)),
            )

            const room = rooms.find((r) => r.id === roomId)
            if (room) {
                // Add notification for the current user
                addNotification({
                    id: `notif-${Date.now()}`,
                    title: "Room Joined",
                    message: `You have successfully joined ${room.name}.`,
                    timestamp: new Date(),
                    read: false,
                    type: "success",
                })
            }

            setIsProcessing(false)

            toast("Room joined")
        }, 1000)
    }

    // Add a notification
    const addNotification = (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev])
    }

    // Simulate receiving notifications (for demo purposes)
    useEffect(() => {
        // Simulate receiving a notification after 3 seconds
        const timer = setTimeout(() => {
            if (notifications.length === 0) {
                addNotification({
                    id: `notif-${Date.now()}`,
                    title: "New Join Request",
                    message: "Sarah Johnson wants to join Design Team",
                    timestamp: new Date(),
                    read: false,
                    type: "info",
                    actionUrl: "#requests",
                    actionLabel: "Review",
                })
            }
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    // Get the appropriate button for a room based on its status
    const getRoomActionButton = (room: Room) => {
        if (room.joined) {
            return (
                <Button size="sm" variant="outline" disabled className="w-full flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span>Member</span>
                </Button>
            )
        }

        if (room.joinRequestStatus === "pending") {
            return (
                <Button size="sm" variant="outline" disabled className="w-full flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span>Request Pending</span>
                </Button>
            )
        }

        if (room.joinRequestStatus === "accepted") {
            return (
                <Button
                    size="sm"
                    variant="default"
                    className="w-full flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    onClick={() => handleJoinRoom(room.id)}
                    disabled={isProcessing}
                >
                    <CheckCircle className="h-4 w-4" />
                    <span>{isProcessing ? "Joining..." : "Join Room"}</span>
                </Button>
            )
        }

        if (room.joinRequestStatus === "rejected") {
            return (
                <Button size="sm" variant="outline" disabled className="w-full flex items-center gap-2 text-muted-foreground">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Request Declined</span>
                </Button>
            )
        }

        return (
            <Button
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleJoinRequest(room.id)}
                disabled={isProcessing}
            >
                <UserPlus className="h-4 w-4" />
                <span>{isProcessing ? "Sending Request..." : "Request to Join"}</span>
            </Button>
        )
    }

    return (
        <div className="flex h-full flex-col">
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search rooms..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <Tabs defaultValue="discover" className="flex-1">
                <div className="border-b px-4">
                    <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
                        <TabsTrigger
                            value="discover"
                            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                        >
                            Discover
                        </TabsTrigger>
                        <TabsTrigger
                            value="joined"
                            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                        >
                            Joined ({joinedRooms.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="requests"
                            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                        >
                            Requests
                            {pendingRequests.length > 0 && (
                                <Badge variant="destructive" className="ml-1 animate-pulse">
                                    {pendingRequests.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="discover" className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-13rem)]">
                        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                            {discoverRooms.map((room) => (
                                <div
                                    key={room.id}
                                    className={cn(
                                        "rounded-xl border p-4 transition-all hover:shadow-md",
                                        room.joinRequestStatus === "accepted" &&
                                        "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20",
                                        room.joinRequestStatus === "pending" &&
                                        "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20",
                                        room.joinRequestStatus === "rejected" &&
                                        "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20",
                                    )}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{room.name}</h3>
                                                {room.isPrivate ? (
                                                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                                                ) : (
                                                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <Badge variant="outline" className="mt-1">
                                                {room.category}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Users className="mr-1 h-3.5 w-3.5" />
                                            {room.members}
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">{room.description}</p>

                                    {/* Status indicator for pending/accepted/rejected requests */}
                                    {room.joinRequestStatus && (
                                        <div
                                            className={cn(
                                                "text-xs flex items-center gap-1.5 mt-3 mb-1 px-2 py-1 rounded-full w-fit",
                                                room.joinRequestStatus === "pending" &&
                                                "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
                                                room.joinRequestStatus === "accepted" &&
                                                "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300",
                                                room.joinRequestStatus === "rejected" &&
                                                "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
                                            )}
                                        >
                                            {room.joinRequestStatus === "pending" && (
                                                <>
                                                    <Clock className="h-3 w-3" />
                                                    <span>Request pending approval</span>
                                                </>
                                            )}
                                            {room.joinRequestStatus === "accepted" && (
                                                <>
                                                    <CheckCircle className="h-3 w-3" />
                                                    <span>Request approved</span>
                                                </>
                                            )}
                                            {room.joinRequestStatus === "rejected" && (
                                                <>
                                                    <XCircle className="h-3 w-3" />
                                                    <span>Request declined</span>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    <div className="mt-4">{getRoomActionButton(room)}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="joined" className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-13rem)]">
                        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                            {joinedRooms.map((room) => (
                                <Link key={room.id} to={`/rooms/${room.id}`}>
                                    <div className="rounded-xl border p-4 transition-colors hover:bg-accent hover:shadow-md">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold">{room.name}</h3>
                                                    {room.isPrivate ? (
                                                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                                                    ) : (
                                                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                                    )}
                                                    {room.isOwner && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            Owner
                                                        </Badge>
                                                    )}
                                                </div>
                                                <Badge variant="outline" className="mt-1">
                                                    {room.category}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Users className="mr-1 h-3.5 w-3.5" />
                                                {room.members}
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">{room.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="requests" className="flex-1 p-0 h-full">
                    <RoomJoinRequests
                        requests={joinRequests.map((req) => ({
                            id: req.id,
                            userId: req.userId,
                            userName: req.userName,
                            userAvatar: req.userAvatar,
                            roomId: req.roomId,
                            roomName: req.roomName,
                            requestedAt: req.requestedAt,
                            status: req.status,
                        }))}
                        onAccept={handleAcceptRequest}
                        onReject={handleRejectRequest}
                        isLoading={isProcessing}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default RoomDiscovery;