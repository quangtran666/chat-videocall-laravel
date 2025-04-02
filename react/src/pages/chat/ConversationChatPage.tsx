import ConversationChatView from "@/components/chat/ConversationChatView.tsx";
import {useParams} from "react-router";

export default function ConversationChatPage() {
    const params = useParams(); // Temp, replace with typescript
    // In a real app, you would fetch chat data based on the ID
    // For this example, we'll use mock data

    return <ConversationChatView conversationId={params.chatId!} />
}
