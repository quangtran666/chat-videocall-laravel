import {useState} from "react";
import {useGetPotentialFriends, useSearchUsers} from "@/hooks/useUser.ts";
import { ScrollArea } from "../../ui/scroll-area.tsx";
import LoaderShape from "@/components/utils/loaders/LoaderShape/LoaderShape.tsx";
import SearchBar from "@/components/find-users/UserSearch/SearchBar.tsx";
import UserSearchCard from "@/components/find-users/UserSearch/UserSearchCard.tsx";
import LoadMoreTrigger from "@/components/find-users/LoadMoreTrigger.tsx";
import useDebounce from "@/hooks/useDebounce.ts";

function UserSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const isSearching = debouncedSearchQuery.length > 0;

    // Fetch potential friends when not searching
    const {
        data: potentialFriendsData,
        fetchNextPage: fetchPotentialFriendsNextPage,
        hasNextPage: hasPotentialFriendsNextPage,
        isFetchingNextPage: isFetchingPotentialFriendsNextPage,
        isPending: isPotentialFriendsPending,
    } = useGetPotentialFriends(12);

    // Fetch search results when searching
    const {
        data: searchData,
        fetchNextPage: fetchSearchNextPage,
        hasNextPage: hasSearchNextPage,
        isFetchingNextPage: isFetchingSearchNextPage,
        isPending: isSearchPending,
    } = useSearchUsers(debouncedSearchQuery, 12);

    // Determine which data source to use based on search state
    const displayData = isSearching ? searchData : potentialFriendsData;
    const fetchNextPage = isSearching ? fetchSearchNextPage : fetchPotentialFriendsNextPage;
    const hasNextPage = isSearching ? hasSearchNextPage : hasPotentialFriendsNextPage;
    const isFetchingNextPage = isSearching ? isFetchingSearchNextPage : isFetchingPotentialFriendsNextPage;
    const isPending = isSearching ? isSearchPending : isPotentialFriendsPending;

    // Get all users from the selected data source
    const allUsers = displayData?.pages.flatMap(page => page.data) || [];

    return (
        <div className="flex flex-col h-full">
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="flex-1 min-h-0">
                {isPending ? (
                    <LoaderShape className={"flex h-full items-center justify-center p-8"} />
                ) : allUsers && allUsers.length > 0 ? (
                    <ScrollArea className="h-full">
                        <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
                            {allUsers.map((user, index) => (
                                <UserSearchCard
                                    {...user}
                                    key={user.id || index}
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
                                {isSearching
                                    ? "Try adjusting your search query or explore different keywords to find users."
                                    : "There are no potential friends to display at the moment."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserSearch;