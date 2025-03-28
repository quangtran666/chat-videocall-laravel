import GroupChatView from "@/components/chat/GroupChatView.tsx";
import {useParams} from "react-router";

function RoomChatPage() {
    const params = useParams(); // Temp, replace with typescript

    return (
        <GroupChatView chatId={params.chatRoomId!} />
    );
}

export default RoomChatPage;