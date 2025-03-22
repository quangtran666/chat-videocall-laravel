import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Check, Search, UserPlus, X} from "lucide-react";
import { Input } from "../ui/input";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {toast} from "sonner";

function UserSearch() {
    const [searchQuery, setSearchQuery] = useState("")
    const [userStatus, setUserStatus] = useState<Record<string, "none" | "sent" | "friends">>({
        "1": "none",
        "2": "none",
        "3": "friends",
        "4": "sent",
        "5": "friends",
        "6": "none",
        "7": "none",
        "8": "none",
        // Adding more users to ensure we have enough content to scroll
        "9": "none",
        "10": "none",
        "11": "none",
        "12": "none",
        "13": "none",
        "14": "none",
    })

    // Mock users data with additional users to ensure scrolling is needed
    const users = [
        {
            id: "1",
            name: "Sarah Johnson",
            username: "@sarahj",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "UX Designer | Coffee enthusiast",
            online: true,
            mutualFriends: 3,
        },
        {
            id: "2",
            name: "David Miller",
            username: "@davidm",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Software Engineer at TechCorp",
            online: false,
            mutualFriends: 1,
        },
        {
            id: "6",
            name: "Michael Brown",
            username: "@michaelb",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Data Scientist | Basketball fan",
            online: true,
            mutualFriends: 0,
        },
        {
            id: "7",
            name: "Olivia Garcia",
            username: "@oliviag",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Content Creator | Foodie",
            online: false,
            mutualFriends: 5,
        },
        {
            id: "8",
            name: "James Wilson",
            username: "@jamesw",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Frontend Developer | Music lover",
            online: true,
            mutualFriends: 2,
        },
        // Additional users to ensure we have enough content to scroll
        {
            id: "9",
            name: "Emma Thompson",
            username: "@emmat",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Product Manager | Travel enthusiast",
            online: true,
            mutualFriends: 4,
        },
        {
            id: "10",
            name: "Daniel Lee",
            username: "@daniell",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Backend Developer | Gaming enthusiast",
            online: false,
            mutualFriends: 2,
        },
        {
            id: "11",
            name: "Sophia Martinez",
            username: "@sophiam",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "UI Designer | Photography lover",
            online: true,
            mutualFriends: 1,
        },
        {
            id: "12",
            name: "William Clark",
            username: "@williamc",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "DevOps Engineer | Hiking enthusiast",
            online: false,
            mutualFriends: 3,
        },
        {
            id: "13",
            name: "Ella Rodriguez",
            username: "@ellar",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Fullstack Developer | Movie buff",
            online: true,
            mutualFriends: 0,
        },
        {
            id: "14",
            name: "Alexander Wilson",
            username: "@alexanderw",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Software Engineer | Fitness enthusiast",
            online: false,
            mutualFriends: 2,
        },
    ]

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.bio.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleSendRequest = (userId: string) => {
        const status = userStatus[userId]

        if (status === "none") {
            setUserStatus((prev) => ({ ...prev, [userId]: "sent" }))
            toast.success("Friend request sent")
        } else if (status === "sent") {
            setUserStatus((prev) => ({ ...prev, [userId]: "none" }))
            toast.success("Friend request canceled")
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 shrink-0">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by name, username, or bio..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                    {filteredUsers.length > 0 ? (
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

                                            {user.mutualFriends > 0 && (
                                                <Badge variant="outline" className="mt-2">
                                                    {user.mutualFriends} mutual {user.mutualFriends === 1 ? "friend" : "friends"}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        {userStatus[user.id] === "none" && (
                                            <Button size="sm" variant="outline" onClick={() => handleSendRequest(user.id)}>
                                                <UserPlus className="mr-1 h-4 w-4" />
                                                Connect
                                            </Button>
                                        )}

                                        {userStatus[user.id] === "sent" && (
                                            <Button size="sm" variant="outline" onClick={() => handleSendRequest(user.id)}>
                                                <X className="mr-1 h-4 w-4" />
                                                Cancel Request
                                            </Button>
                                        )}

                                        {userStatus[user.id] === "friends" && (
                                            <Button size="sm" variant="ghost" disabled>
                                                <Check className="mr-1 h-4 w-4" />
                                                Connected
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center p-8 text-center">
                            <div className="max-w-md">
                                <h3 className="mb-2 text-lg font-medium">No users found</h3>
                                <p className="text-sm text-muted-foreground">
                                    Try adjusting your search query or explore different keywords to find users.
                                </p>
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    )
}

export default UserSearch;