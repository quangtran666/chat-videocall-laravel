import GroupChatView from "@/components/chat/GroupChatView"
import IndividualChatView from "@/components/chat/IndividualChatView.tsx";
import {useParams} from "react-router";

export default function ChatPage() {
    const params = useParams(); // Temp, replace with typescript
    // In a real app, you would fetch chat data based on the ID
    // For this example, we'll use mock data

    // Group chats have IDs 2, 4, and 6 in our mock data
    const isGroupChat = ["2", "4", "6"].includes(params.chatId!) // Temp, replace with typescript

    if (isGroupChat) {
        return <GroupChatView chatId={params.chatId!} />
    }

    return <IndividualChatView chatId={params.chatId!} />
}
