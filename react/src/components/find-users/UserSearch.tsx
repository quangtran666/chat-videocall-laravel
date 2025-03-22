import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Check, Search, UserPlus, X} from "lucide-react";
import { Input } from "../ui/input";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";

function UserSearch() {
    const [searchQuery, setSearchQuery] = useState("")
    const [friendRequests, setFriendRequests] = useState<Record<string, "none" | "pending" | "sent" | "friends">>({
        "1": "none",
        "2": "none",
        "3": "pending",
        "4": "sent",
        "5": "friends",
        "6": "none",
        "7": "none",
        "8": "none",
    })

    const users = [
        {
            id: "1",
            name: "Sarah Johnson",
            username: "@sarahj",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "UX Designer | Coffee enthusiast",
            online: true,
        },
        {
            id: "2",
            name: "David Miller",
            username: "@davidm",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Software Engineer at TechCorp",
            online: false,
        },
        {
            id: "3",
            name: "Emma Wilson",
            username: "@emmaw",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Digital Marketer | Travel lover",
            online: true,
        },
        {
            id: "4",
            name: "Alex Thompson",
            username: "@alext",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Product Manager | Gamer",
            online: true,
        },
        {
            id: "5",
            name: "Jessica Lee",
            username: "@jessical",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Graphic Designer | Art enthusiast",
            online: false,
        },
        {
            id: "6",
            name: "Michael Brown",
            username: "@michaelb",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Data Scientist | Basketball fan",
            online: true,
        },
        {
            id: "7",
            name: "Olivia Garcia",
            username: "@oliviag",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Content Creator | Foodie",
            online: false,
        },
        {
            id: "8",
            name: "James Wilson",
            username: "@jamesw",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Frontend Developer | Music lover",
            online: true,
        },
    ]

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.bio.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleFriendRequest = (userId: string) => {
        setFriendRequests((prev) => {
            const currentStatus = prev[userId]

            if (currentStatus === "none") {
                return { ...prev, [userId]: "sent" }
            } else if (currentStatus === "pending") {
                return { ...prev, [userId]: "friends" }
            } else if (currentStatus === "sent") {
                return { ...prev, [userId]: "none" }
            }

            return prev
        })
    }

    const renderActionButton = (userId: string) => {
        const status = friendRequests[userId]

        switch (status) {
            case "none":
                return (
                    <Button size="sm" variant="outline" onClick={() => handleFriendRequest(userId)}>
                        <UserPlus className="mr-1 h-4 w-4" />
                        Connect
                    </Button>
                )
            case "pending":
                return (
                    <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleFriendRequest(userId)}>
                            <Check className="mr-1 h-4 w-4" />
                            Accept
                        </Button>
                        <Button size="sm" variant="ghost">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )
            case "sent":
                return (
                    <Button size="sm" variant="outline" onClick={() => handleFriendRequest(userId)}>
                        Pending
                    </Button>
                )
            case "friends":
                return (
                    <Button size="sm" variant="ghost" disabled>
                        <Check className="mr-1 h-4 w-4" />
                        Connected
                    </Button>
                )
        }
    }

    return (
        <div className="flex h-full flex-col">
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="rounded-lg border p-4">
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <UserAvatar src={user.avatar} alt={user.name} />
                                    {user.online && (
                                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-muted-foreground">{user.username}</div>
                                    <p className="mt-1 text-sm">{user.bio}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">{renderActionButton(user.id)}</div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default UserSearch;