import {useState} from "react";
import {toast} from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import {Check, Loader2, Search, UserPlus, Users, X} from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../utils/UserAvatar";
import { Button } from "../ui/button";

interface User {
    id: string
    name: string
    username: string
    avatar: string
    online: boolean
    mutualFriends?: number
    alreadyMember?: boolean
}

interface AddMemberDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    existingMemberIds: string[]
    onAddMembers: (selectedUsers: User[]) => Promise<void>
}

function AddMemberDialog({ open, onOpenChange, existingMemberIds, onAddMembers }: AddMemberDialogProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<User[]>([])

    // Mock users data - in a real app, this would be fetched from an API
    const users: User[] = [
        {
            id: "101",
            name: "Jessica Parker",
            username: "@jessicap",
            avatar: "/placeholder.svg?height=40&width=40",
            online: true,
            mutualFriends: 3,
            alreadyMember: existingMemberIds.includes("101"),
        },
        {
            id: "102",
            name: "Michael Chen",
            username: "@michaelc",
            avatar: "/placeholder.svg?height=40&width=40",
            online: false,
            mutualFriends: 1,
            alreadyMember: existingMemberIds.includes("102"),
        },
        {
            id: "103",
            name: "Sophia Rodriguez",
            username: "@sophiar",
            avatar: "/placeholder.svg?height=40&width=40",
            online: true,
            mutualFriends: 0,
            alreadyMember: existingMemberIds.includes("103"),
        },
        {
            id: "104",
            name: "James Wilson",
            username: "@jamesw",
            avatar: "/placeholder.svg?height=40&width=40",
            online: true,
            mutualFriends: 2,
            alreadyMember: existingMemberIds.includes("104"),
        },
        {
            id: "105",
            name: "Olivia Taylor",
            username: "@oliviat",
            avatar: "/placeholder.svg?height=40&width=40",
            online: false,
            mutualFriends: 4,
            alreadyMember: existingMemberIds.includes("105"),
        },
    ]

    // Filter users based on search query
    const filteredUsers = users.filter(
        (user) =>
            (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase())) &&
            !user.alreadyMember,
    )

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        // Simulate search delay
        setIsSearching(true)
        setTimeout(() => {
            setIsSearching(false)
        }, 500)
    }

    const toggleUserSelection = (user: User) => {
        if (selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
            setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id))
        } else {
            setSelectedUsers([...selectedUsers, user])
        }
    }

    const handleAddMembers = async () => {
        if (selectedUsers.length === 0) {
            toast.warning("No users selected")
            return
        }

        setIsLoading(true)
        try {
            await onAddMembers(selectedUsers)
            toast.success("Members added")
            setSelectedUsers([])
            setSearchQuery("")
            onOpenChange(false)
        } catch (error) {
            toast.error("Failed to add members")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Members to Group</DialogTitle>
                </DialogHeader>

                <div className="relative my-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                {selectedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedUsers.map((user) => (
                            <Badge key={user.id} variant="secondary" className="flex items-center gap-1 py-1">
                                {user.name}
                                <button
                                    onClick={() => toggleUserSelection(user)}
                                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                                    aria-label={`Remove ${user.name}`}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="relative">
                    {isSearching ? (
                        <div className="flex justify-center items-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <ScrollArea className="h-[300px] pr-4 -mr-4">
                            {filteredUsers.length > 0 ? (
                                <div className="space-y-2">
                                    {filteredUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className={`flex items-center justify-between p-3 rounded-md ${
                                                selectedUsers.some((selectedUser) => selectedUser.id === user.id)
                                                    ? "bg-accent"
                                                    : "hover:bg-muted"
                                            }`}
                                            onClick={() => toggleUserSelection(user)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <UserAvatar src={user.avatar} alt={user.name} size="sm" />
                                                    {user.online && (
                                                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-background" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{user.username}</div>
                                                </div>
                                            </div>

                                            {user.mutualFriends! > 0 && (
                                                <Badge variant="outline" className="flex items-center gap-1 mr-2">
                                                    <Users className="h-3 w-3" />
                                                    {user.mutualFriends}
                                                </Badge>
                                            )}

                                            <div className="flex-shrink-0">
                                                {selectedUsers.some((selectedUser) => selectedUser.id === user.id) ? (
                                                    <Check className="h-5 w-5 text-primary" />
                                                ) : (
                                                    <UserPlus className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                    <p className="text-muted-foreground">No users found</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Try a different search term or all members are already in the group
                                    </p>
                                </div>
                            )}
                        </ScrollArea>
                    )}
                </div>

                <DialogFooter className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {selectedUsers.length} user{selectedUsers.length !== 1 && "s"} selected
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddMembers} disabled={selectedUsers.length === 0 || isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add to Group
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddMemberDialog;