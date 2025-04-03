import {useQueryClient} from "@tanstack/react-query";
import {useUser} from "@/hooks/useUser.ts";
import {useEffect, useState} from "react";
import {echo} from "@/plugins/echo.ts";
import {MessageType} from "@/types/conversation/Conversation.ts";

/**
 * Custom hook to handle real-time message broadcasts in a conversation
 *
 * This hook listens for new message events on a private channel and
 * updates the TanStack Query cache when new messages are received
 */
export function useConversationBroadcast(conversationId: string) {
    const queryClient = useQueryClient();
    const { data: user } = useUser();
    const [userTyping, setUserTyping] = useState<string[]>([]);

    function setupNewMessageListener(channel: any) {
        // Listen for new message events
        channel.listen(`.new.message`, (data: any) => {
            console.log(data);

            // Only process messages that aren't from the current user
            if (data.sender.id === user?.id) return;

            // Format received a message to match the MessageType structure
            const newMessage: MessageType = {
                id: data.id,
                content: data.content,
                type: data.type,
                created_at: data.created_at,
                sender: {
                    id: data.sender.id,
                    name: data.sender.name,
                    avatar_url: data.sender.avatar_url,
                    created_at: "",
                    email: "",
                    updated_at: ""
                },
                reply_id: data.reply_id,
                reply: null,
                reactions_count: 0,
                status: 'sent',
                files: [] // Initialize with an empty files array
            }

            // Update the query cache with the new message
            queryClient.setQueryData(['conversation-messages', conversationId], (oldData: any)=> {
                if (!oldData) return { pages: [], pageParams: [] }

                // Create a copy of the old data
                const newPages = [...oldData.pages];

                // Add the new message to the most recent page
                if (newPages.length > 0) {
                    // Get the copy of the most recent page
                    const firstPage = {...newPages[0]};

                    // Add the new message to the beginning of the first page
                    firstPage.data = {
                        ...firstPage.data,
                        data: [newMessage, ...(firstPage.data.data || [])]
                    };

                    // Update the first page in the new pages array
                    newPages[0] = firstPage;
                }

                return {
                    ...oldData,
                    pages: newPages,
                }
            });
        })
    }

    function setupTypingListener(channel: any) {
        channel.listenForWhisper('typing', (e: any) => {
            if (e.userId === user?.id) return;

            if (e.isTyping) {
                setUserTyping(prev => {
                    // Add user to a typing list if not already there
                    if (!prev.includes(e.name)) {
                        return [...prev, e.name];
                    }
                    return prev;
                })
            } else {
                setUserTyping(prev => {
                    // Remove user from a typing list
                    return prev.filter(name => name !== e.name);
                })
            }
        })
    }

    function setupChannelListeners(channel: any) {
        setupNewMessageListener(channel);
        setupTypingListener(channel);
    }

    function cleanupChannelListeners(channel: any) {
        channel.stopListening(`.new.message`);
        echo.leave(`conversation.${conversationId}`);
    }

    useEffect(() => {
        if (!conversationId || !echo || !user ) return;

        // Subscribe to the private conversation channel
        const channel = echo.private(`conversation.${conversationId}`);

        setupChannelListeners(channel);

        return () => {
            cleanupChannelListeners(channel);
        }
    }, [conversationId, user, queryClient]);

    function sendTypingIndicator(isTyping: boolean) {
        if (!user || !conversationId || !echo) return;

        echo.private(`conversation.${conversationId}`)
            .whisper('typing', {
                name: user.name,
                userId: user.id,
                isTyping
            });
    }

    return { userTyping, sendTypingIndicator }
}