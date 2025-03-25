import UserSearch from "@/components/find-users/UserSearch/UserSearch.tsx";
import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import { Search, UserCheck, UserPlus } from "lucide-react";
import SentRequests from "@/components/find-users/SentFriend/SentRequests.tsx";
import ReceivedRequests from "@/components/find-users/ReceivedRequest/ReceivedRequests.tsx";

function FindUserPage() {
    const [activeTab, setActiveTab] = useState("search")

    return (
        <div className="flex h-full flex-col">
            <div className="border-b p-4 shrink-0">
                <h1 className="text-2xl font-bold">Find Users</h1>
                <p className="text-sm text-muted-foreground">Connect with other users on the platform</p>
            </div>

            <Tabs
                defaultValue="search"
                className="flex flex-1 flex-col min-h-0"
                value={activeTab}
                onValueChange={setActiveTab}
            >
                <div className="border-b px-4 shrink-0">
                    <TabsList className="h-14">
                        <TabsTrigger value="search" className="flex items-center gap-2 data-[state=active]:bg-background">
                            <Search className="h-4 w-4" />
                            <span>Find Users</span>
                        </TabsTrigger>
                        <TabsTrigger value="sent" className="flex items-center gap-2 data-[state=active]:bg-background">
                            <UserPlus className="h-4 w-4" />
                            <span>Sent Requests</span>
                        </TabsTrigger>
                        <TabsTrigger value="received" className="flex items-center gap-2 data-[state=active]:bg-background">
                            <UserCheck className="h-4 w-4" />
                            <span>Received Requests</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 min-h-0">
                    <TabsContent value="search" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
                        <UserSearch />
                    </TabsContent>

                    <TabsContent value="sent" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
                        <SentRequests />
                    </TabsContent>

                    <TabsContent value="received" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
                        <ReceivedRequests />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

export default FindUserPage;