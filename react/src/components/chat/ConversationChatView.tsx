import {useState} from "react";
import {UserAvatar} from "../utils/UserAvatar";
import {Button} from "@/components/ui/button.tsx";
import {Info, Phone, Video} from "lucide-react";
import ChatInput from "./chat-input/ChatInput.tsx";
import MessageList from "./MessageList";
import {
    useGetConversationMessages,
    useGetOtherUserInConversation,
    useSendMessageToConversation
} from "@/hooks/useConversation.ts";
import {MessageType} from "@/types/conversation/Conversation.ts";
import ConversationSkeleton from "@/components/chat/Skeleton/ConversationSkeleton.tsx";
import MessageListSkeleton from "@/components/chat/Skeleton/MessageListSkeleton.tsx";

interface IndividualChatViewProps {
    conversationId: string
}

function ConversationChatView({conversationId}: IndividualChatViewProps) {
    const {
        data: messages,
        fetchNextPage: fetchNextMessages,
        hasNextPage,
        isFetchingNextPage,
        isPending: isMessagesLoading,
    } = useGetConversationMessages(conversationId, 9)

    const messagesFlat = (messages?.pages?.flatMap((page) => page.data) || []).reverse()

    const {
        data: otherUser,
        isPending: isOtherUserLoading,
    } = useGetOtherUserInConversation(conversationId);

    const { mutateAsync: sendMessage } = useSendMessageToConversation(conversationId);

    const [replyToMessage, setReplyToMessage] = useState<MessageType | null>(null)

    const handleSendMessage = async (content: string, files?: File[], replyToId?: string) => {
        await sendMessage({
            content,
            replyId: replyToId ?? null,
            files: files || [],
        })
    }

    const handleReactionAdd = (messageId: string, emoji: string) => {
        // setMessages(
        //     messages.map((message) => {
        //         if (message.id === messageId) {
        //             // Check if user already reacted with this emoji
        //             const existingReactionIndex = message.reactions?.findIndex(
        //                 (r) => r.emoji === emoji && r.userId === "current-user",
        //             )
        //
        //             if (existingReactionIndex !== undefined && existingReactionIndex >= 0) {
        //                 // Remove the reaction if it already exists
        //                 const updatedReactions = [...(message.reactions || [])]
        //                 updatedReactions.splice(existingReactionIndex, 1)
        //                 return { ...message, reactions: updatedReactions }
        //             } else {
        //                 // Add the new reaction
        //                 return {
        //                     ...message,
        //                     reactions: [
        //                         ...(message.reactions || []),
        //                         {
        //                             emoji,
        //                             userId: "current-user",
        //                             userName: "You",
        //                         },
        //                     ],
        //                 }
        //             }
        //         }
        //         return message
        //     }),
        // )
    }

    const handleReplyMessage = (messageId: string) => {
        // const messageToReply = messages.find((m) => m.id === messageId)
        // if (messageToReply) {
        //     setReplyToMessage(messageToReply)
        // }
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                    {isOtherUserLoading ? (
                        <ConversationSkeleton />
                    ) : (
                        <>
                            <UserAvatar src={otherUser?.avatar_url} alt={otherUser?.name}/>
                            <div>
                                <div className="font-medium">{otherUser?.name}</div>
                                {/*<div className="text-xs text-muted-foreground">{contact.lastSeen}</div>*/}
                                <div className="text-xs text-muted-foreground">Temp</div>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" aria-label="Voice call">
                        <Phone className="h-4 w-4"/>
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Video call">
                        <Video className="h-4 w-4"/>
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Info">
                        <Info className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-hidden">
                {isMessagesLoading ? (
                    <MessageListSkeleton />
                ) : (
                    <MessageList
                        messages={messagesFlat}
                        onReactionAdd={handleReactionAdd}
                        onReplyMessage={handleReplyMessage}
                        // Use Infinity Query Related Functions
                        fetchNextPage={fetchNextMessages}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                )}
            </div>
            <ChatInput
                onSendMessage={handleSendMessage}
                replyTo={replyToMessage}
                onCancelReply={() => setReplyToMessage(null)}
            />
        </div>
    )
}

export default ConversationChatView;
