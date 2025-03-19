import {useState} from "react";
import { UserAvatar } from "../utils/UserAvatar";
import {Button} from "@/components/ui/button.tsx";
import {Info, Phone, Video} from "lucide-react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

interface IndividualChatViewProps {
    chatId: string
}

function IndividualChatView({ chatId } : IndividualChatViewProps) {
    // In a real app, you would fetch this data from an API
    const contact = {
        id: chatId,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "Online",
        lastSeen: "Active now",
    }

    const [messages, setMessages] = useState([
        {
            id: "1",
            content: "Hey there! How are you doing?",
            timestamp: "10:30 AM",
            sender: "them",
            senderName: contact.name,
            senderAvatar: contact.avatar,
        },
        {
            id: "2",
            content: "I'm good, thanks! Just finishing up some work. How about you?",
            timestamp: "10:32 AM",
            sender: "me",
        },
        {
            id: "3",
            content: "Pretty good! Are we still meeting tomorrow for coffee?",
            timestamp: "10:34 AM",
            sender: "them",
            senderName: contact.name,
            senderAvatar: contact.avatar,
        },
        {
            id: "4",
            content: "Yes, definitely! Looking forward to it. Shall we say 10am at the usual place?",
            timestamp: "10:36 AM",
            sender: "me",
        },
        {
            id: "5",
            content: "Perfect! See you then 😊",
            timestamp: "10:38 AM",
            sender: "them",
            senderName: contact.name,
            senderAvatar: contact.avatar,
        },
    ])

    const handleSendMessage = (content: string, files?: File[]) => {
        const newMessage = {
            id: Date.now().toString(),
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sender: "me",
            files: files?.map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file),
            })),
        }

        setMessages([...messages, newMessage])
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                    <UserAvatar src={contact.avatar} alt={contact.name} />
                    <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.lastSeen}</div>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" aria-label="Voice call">
                        <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Video call">
                        <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Info">
                        <Info className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <MessageList messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
}

export default IndividualChatView;