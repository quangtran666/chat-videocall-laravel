import {Separator} from "@/components/ui/separator.tsx";
import UserProfile from "@/components/sidebar/UserProfile.tsx";
import SidebarNavigation from "@/components/sidebar/SidebarNavigation.tsx";
import CreateRoomButton from "@/components/sidebar/CreateRoomButton.tsx";
import RecentChats from "@/components/sidebar/RecentChats.tsx";
import {Link} from "react-router";

function Sidebar() {
    return (
        <div className="flex h-full w-64 flex-col border-r bg-background">
            <div className="flex h-14 items-center border-b px-4">
                <Link to="/chats" className="text-lg font-semibold">Chat App</Link>
            </div>
            <CreateRoomButton />
            <SidebarNavigation />
            <Separator className="my-4"/>
            <RecentChats />
            <UserProfile />
        </div>
    );
}

export default Sidebar;