// Mock data for friends
import FriendsList from "@/components/friend/FriendsList.tsx";

const mockFriends = [
    {
        id: "1",
        name: "Sarah Johnson",
        username: "@sarahj",
        avatar: "/placeholder.svg?height=40&width=40",
        online: true,
        mutualFriends: 5,
    },
    {
        id: "2",
        name: "David Miller",
        username: "@davidm",
        avatar: "/placeholder.svg?height=40&width=40",
        online: false,
        mutualFriends: 3,
        lastActive: "2 hours ago",
    },
    {
        id: "3",
        name: "Emma Wilson",
        username: "@emmaw",
        avatar: "/placeholder.svg?height=40&width=40",
        online: true,
        mutualFriends: 8,
    },
    {
        id: "4",
        name: "Alex Thompson",
        username: "@alext",
        avatar: "/placeholder.svg?height=40&width=40",
        online: false,
        mutualFriends: 2,
        lastActive: "yesterday",
    },
    {
        id: "5",
        name: "Jessica Lee",
        username: "@jessical",
        avatar: "/placeholder.svg?height=40&width=40",
        online: true,
        mutualFriends: 0,
    },
    {
        id: "6",
        name: "Michael Brown",
        username: "@michaelb",
        avatar: "/placeholder.svg?height=40&width=40",
        online: false,
        mutualFriends: 7,
        lastActive: "3 days ago",
    },
    {
        id: "7",
        name: "Olivia Garcia",
        username: "@oliviag",
        avatar: "/placeholder.svg?height=40&width=40",
        online: true,
        mutualFriends: 4,
    },
    {
        id: "8",
        name: "James Wilson",
        username: "@jamesw",
        avatar: "/placeholder.svg?height=40&width=40",
        online: false,
        mutualFriends: 1,
        lastActive: "1 week ago",
    },
    {
        id: "9",
        name: "Sophia Martinez",
        username: "@sophiam",
        avatar: "/placeholder.svg?height=40&width=40",
        online: true,
        mutualFriends: 6,
    },
    {
        id: "10",
        name: "Daniel Clark",
        username: "@danielc",
        avatar: "/placeholder.svg?height=40&width=40",
        online: false,
        mutualFriends: 3,
        lastActive: "just now",
    },
]

function FriendsPage() {
    return (
        <FriendsList friends={mockFriends} />
    );
}

export default FriendsPage;