import {useState} from "react";
import {useGetPotentialFriends} from "@/hooks/useUser.ts";
import { ScrollArea } from "../../ui/scroll-area.tsx";
import LoaderShape from "@/components/utils/loaders/LoaderShape/LoaderShape.tsx";
import SearchBar from "@/components/find-users/UserSearch/SearchBar.tsx";
import UserSearchCard from "@/components/find-users/UserSearch/UserSearchCard.tsx";
import LoadMoreTrigger from "@/components/find-users/UserSearch/LoadMoreTrigger.tsx";

function UserSearch() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useGetPotentialFriends(12);

    const [searchQuery, setSearchQuery] = useState("");

    const allUsers = data?.pages.flatMap(page => page.data) || [];

    // Filter users based on search query
    const filteredUsers = allUsers.filter(
        (user) =>
            user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="flex-1 min-h-0">
                {isPending ? (
                    <LoaderShape className={"flex h-full items-center justify-center p-8"} />
                ) : filteredUsers && filteredUsers.length > 0 ? (
                    <ScrollArea className="h-full">
                        <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredUsers.map((user, index) => (
                                <UserSearchCard
                                    {...user}
                                    key={index}
                                />
                            ))}
                        </div>
                        <LoadMoreTrigger
                            onLoadMore={fetchNextPage}
                            hasMore={hasNextPage}
                            isLoading={isFetchingNextPage}
                        />
                    </ScrollArea>
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
            </div>
        </div>
    );
}

export default UserSearch;