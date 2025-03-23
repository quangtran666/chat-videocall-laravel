import {useState} from "react";
import { UserAvatar } from "../utils/UserAvatar";
import {Button} from "@/components/ui/button.tsx";
import {Info, Phone, Video} from "lucide-react";
import ChatInput from "./ChatInput";
import MessageList, {Message} from "./MessageList";

interface IndividualChatViewProps {
    chatId: string
}

function IndividualChatView({ chatId }: IndividualChatViewProps) {
    // In a real app, you would fetch this data from an API
    const contact = {
        id: chatId,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "Online",
        lastSeen: "Active now",
    }

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hey there! How are you doing?",
            timestamp: "10:30 AM",
            sender: "them",
            senderName: contact.name,
            senderAvatar: contact.avatar,
            reactions: [],
        },
        {
            id: "2",
            content: "I'm good, thanks! Just finishing up some work. How about you?",
            timestamp: "10:32 AM",
            sender: "me",
            reactions: [],
        },
        {
            id: "3",
            content: "Pretty good! Are we still meeting tomorrow for coffee?",
            timestamp: "10:34 AM",
            sender: "them",
            senderName: contact.name,
            senderAvatar: contact.avatar,
            reactions: [],
        },
        {
            id: "4",
            content: "Yes, definitely! Looking forward to it. Shall we say 10am at the usual place?",
            timestamp: "10:36 AM",
            sender: "me",
            reactions: [],
        },
        {
            id: "5",
            content: "Perfect! See you then 😊",
            timestamp: "10:38 AM",
            sender: "them",
            senderName: contact.name,
            senderAvatar: contact.avatar,
            reactions: [],
        },
    ])

    const [replyToMessage, setReplyToMessage] = useState<Message | null>(null)

    const handleSendMessage = (content: string, files?: File[], replyToId?: string) => {
        // Find the message being replied to
        const replyMessage = replyToId ? messages.find((m) => m.id === replyToId) : null

        const newMessage: Message = {
            id: Date.now().toString(),
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sender: "me",
            reactions: [],
            files: files?.map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file),
            })),
        }

        // Add reply information if replying to a message
        if (replyMessage) {
            newMessage.replyTo = {
                id: replyMessage.id,
                content: replyMessage.content,
                senderName: replyMessage.senderName,
            }
        }

        setMessages([...messages, newMessage])
        setReplyToMessage(null) // Clear reply state after sending
    }

    const handleReactionAdd = (messageId: string, emoji: string) => {
        setMessages(
            messages.map((message) => {
                if (message.id === messageId) {
                    // Check if user already reacted with this emoji
                    const existingReactionIndex = message.reactions?.findIndex(
                        (r) => r.emoji === emoji && r.userId === "current-user",
                    )

                    if (existingReactionIndex !== undefined && existingReactionIndex >= 0) {
                        // Remove the reaction if it already exists
                        const updatedReactions = [...(message.reactions || [])]
                        updatedReactions.splice(existingReactionIndex, 1)
                        return { ...message, reactions: updatedReactions }
                    } else {
                        // Add the new reaction
                        return {
                            ...message,
                            reactions: [
                                ...(message.reactions || []),
                                {
                                    emoji,
                                    userId: "current-user",
                                    userName: "You",
                                },
                            ],
                        }
                    }
                }
                return message
            }),
        )
    }

    const handleReplyMessage = (messageId: string) => {
        const messageToReply = messages.find((m) => m.id === messageId)
        if (messageToReply) {
            setReplyToMessage(messageToReply)
        }
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
            <MessageList messages={messages} onReactionAdd={handleReactionAdd} onReplyMessage={handleReplyMessage} />
            <ChatInput
                onSendMessage={handleSendMessage}
                replyTo={replyToMessage}
                onCancelReply={() => setReplyToMessage(null)}
            />
        </div>
    )
}

export default IndividualChatView;