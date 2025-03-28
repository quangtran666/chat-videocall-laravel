import IndividualChatView from "@/components/chat/IndividualChatView.tsx";
import {useParams} from "react-router";

export default function ConversationChatPage() {
    const params = useParams(); // Temp, replace with typescript
    // In a real app, you would fetch chat data based on the ID
    // For this example, we'll use mock data

    return <IndividualChatView chatId={params.chatId!} />
}
