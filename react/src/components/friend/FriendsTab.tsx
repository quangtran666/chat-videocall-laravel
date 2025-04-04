import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import LoaderShape from "@/components/utils/loaders/LoaderShape/LoaderShape.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import FriendItem from "@/components/friend/FriendItem.tsx";
import LoadMoreTrigger from "@/components/find-users/LoadMoreTrigger.tsx";
import {Users} from "lucide-react";
import {useGetUserFriends} from "@/hooks/useUser.ts";

type FriendTabProps = {
    debouncedSearchQuery: string
}

function FriendsTab({debouncedSearchQuery}: FriendTabProps) {
    const [activeTab, setActiveTab] = useState("all")

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useGetUserFriends(debouncedSearchQuery, 9);

    const allFriends = data?.pages.flatMap(page => page.data) || []

    // @ts-ignore
    const totalFriends = data?.pages[0].total;

    return (
        <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col min-h-0"
        >
            <div className="px-4 shrink-0 border-b">
                <TabsList className="justify-start rounded-lg border-b-0 p-0">
                    <TabsTrigger
                        value="all"
                        className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                    >
                        All Friends
                        <Badge variant="secondary" className="ml-2">
                            {totalFriends}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger
                        value="online"
                        className="rounded-lg border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                    >
                        Online
                        <Badge variant="secondary" className="ml-2 bg-green-500 text-white">
                            {totalFriends}
                        </Badge>
                    </TabsTrigger>
                </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
                <TabsContent
                    value="all"
                    className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col"
                >
                    {isPending ? (
                        <LoaderShape className={"flex h-full items-center justify-center p-8"}/>
                    ) : allFriends && allFriends.length > 0 ? (
                        <ScrollArea className="h-full">
                            <div className="flex flex-col divide-y">
                                {allFriends.map((friend, index) => (
                                    <FriendItem
                                        key={index}
                                        friend={friend}
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
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                            <div className="bg-muted/30 rounded-full p-3 mb-3">
                                <Users className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="font-medium text-lg">No friends found</p>
                            <p className="text-sm text-muted-foreground mt-1">{debouncedSearchQuery ? "Try adjusting your search" : "Add some friends to get started"}</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent
                    value="online"
                    className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col"
                >
                    {/*<FriendsListContent*/}
                    {/*    friends={displayedFriends}*/}
                    {/*    emptyMessage="No online friends"*/}
                    {/*    emptyDescription={searchQuery ? "Try adjusting your search" : "Your friends are currently offline"}*/}
                    {/*/>*/}
                </TabsContent>
            </div>
        </Tabs>
    );
}

export default FriendsTab;