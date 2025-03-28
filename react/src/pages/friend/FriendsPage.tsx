import FriendDisplay from "@/components/friend/FriendDisplay.tsx";
import FriendHeader from "@/components/friend/FriendHeader.tsx";

function FriendsPage() {
    return (
        <div className="flex h-full flex-col">
            <FriendHeader/>
            <FriendDisplay />
        </div>
    );
}

export default FriendsPage;