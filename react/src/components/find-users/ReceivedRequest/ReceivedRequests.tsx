import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useGetReceivedFriendRequests} from "@/hooks/useUser.ts";
import LoaderShape from "@/components/utils/loaders/LoaderShape/LoaderShape.tsx";
import LoadMoreTrigger from "@/components/find-users/LoadMoreTrigger.tsx";
import ReceivedRequestCard from "@/components/find-users/ReceivedRequest/ReceivedRequestCard.tsx";

function ReceivedRequests() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useGetReceivedFriendRequests(12);

    const receivedRequests = data?.pages.flatMap(page => page.data) || [];

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
                {isPending ? (
                    <LoaderShape className={"flex h-full items-center justify-center p-8"}/>
                ) : receivedRequests && receivedRequests.length > 0 ? (
                    <ScrollArea className="h-full">
                        <div className="divide-y">
                            {receivedRequests.map((request, index) => (
                                <ReceivedRequestCard
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

export default ReceivedRequests;