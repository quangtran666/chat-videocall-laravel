import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Check, Search, UserPlus, X} from "lucide-react";
import {Input} from "../ui/input";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {UserAvatar} from "@/components/utils/UserAvatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {toast} from "sonner";
import {useGetPotentialFriends} from "@/hooks/useUser.ts";
import InfiniteScrollContainer from "@/components/utils/InfiniteScrollContainer.tsx";

function UserSearch() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending
    } = useGetPotentialFriends(12);

    const [searchQuery, setSearchQuery] = useState("");
    const [userStatus, setUserStatus] = useState<Record<string, "none" | "sent" | "friends">>({});

    const allUsers = data?.pages.flatMap(page => page.data) || [];

    // Filter users based on search query
    const filteredUsers = allUsers.filter(
        (user) =>
            user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSendRequest = (userId: number) => {
        const status = userStatus[userId] || "none";

        if (status === "none") {
            setUserStatus((prev) => ({...prev, [userId]: "sent"}));
            toast.success("Friend request sent");
        } else if (status === "sent") {
            setUserStatus((prev) => ({...prev, [userId]: "none"}));
            toast.success("Friend request canceled");
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 shrink-0">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
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
                <InfiniteScrollContainer
                    className="h-full"
                    onBottomReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
                >
                    <ScrollArea className="h-full">
                        {isPending ? (
                            <div className="flex h-full items-center justify-center p-8">
                                <div className="text-center">Loading users...</div>
                            </div>
                        ) : filteredUsers.length > 0 ? (
                            <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
                                {filteredUsers.map((user, index) => (
                                    <div key={index} className="rounded-lg border p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="relative">
                                                <UserAvatar src={user.avatar_url} alt={user.name}/>
                                                {/*{user.online && (*/}
                                                <span
                                                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"/>
                                                {/*)}*/}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-muted-foreground">{user.name}</div>
                                                {/*<p className="mt-1 text-sm">{user.bio}</p>*/}
                                                <p className="mt-1 text-sm">Bio</p>

                                                <Badge variant="outline" className="mt-2">
                                                    {user.mutual_friends_count} mutual {user.mutual_friends_count === 1 ? "friend" : "friends"}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            {userStatus[user.id] === "none" && (
                                                <Button size="sm" variant="outline"
                                                        onClick={() => handleSendRequest(user.id)}>
                                                    <UserPlus className="mr-1 h-4 w-4"/>
                                                    Connect
                                                </Button>
                                            )}

                                            {userStatus[user.id] === "sent" && (
                                                <Button size="sm" variant="outline"
                                                        onClick={() => handleSendRequest(user.id)}>
                                                    <X className="mr-1 h-4 w-4"/>
                                                    Cancel Request
                                                </Button>
                                            )}

                                            {userStatus[user.id] === "friends" && (
                                                <Button size="sm" variant="ghost" disabled>
                                                    <Check className="mr-1 h-4 w-4"/>
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

                        {isFetchingNextPage && (
                            <div className="flex justify-center p-4">
                                <div className="text-sm text-muted-foreground">Loading more users...</div>
                            </div>
                        )}
                    </ScrollArea>
                </InfiniteScrollContainer>
            </div>
        </div>
    )
}

export default UserSearch;