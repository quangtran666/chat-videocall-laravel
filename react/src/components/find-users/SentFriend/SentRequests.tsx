import {ScrollArea} from "../../ui/scroll-area.tsx";
import {useGetSentFriendRequests} from "@/hooks/useUser.ts";
import LoaderShape from "@/components/utils/loaders/LoaderShape/LoaderShape.tsx";
import LoadMoreTrigger from "@/components/find-users/LoadMoreTrigger.tsx";
import SentFriendCard from "@/components/find-users/SentFriend/SentFriendCard.tsx";

function SentRequests() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useGetSentFriendRequests(12);

    const allRequests = data?.pages.flatMap(page => page.data) || [];

    return (
        <div className="flex flex-col h-full">
            {/* The key fix is here - ensuring the ScrollArea has a fixed height or fills the remaining space */}
            <div className="flex-1 min-h-0">
                {isPending ? (
                    <LoaderShape className={"flex h-full items-center justify-center p-8"}/>
                ) : allRequests && allRequests.length > 0 ? (
                    <ScrollArea className="h-full">
                        <div className="divide-y">
                            {allRequests.map((request, index) => (
                                <SentFriendCard
                                    {...request}
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
    )
}

export default SentRequests;