import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner"
import {
    createConversation,
    getConversationMessages,
    getOtherUserInConversation, sendMessageToConversation
} from "@/services/conversation-service.ts";
import { useNavigate } from "react-router";
import {MessageType, SendMessageRequestType} from "@/types/conversation/Conversation.ts";
import {UserType} from "@/types/user/User.ts";
import {useUser} from "@/hooks/useUser.ts";
import { v4 as uuidv4 } from "uuid"

export const useCreateConversation = () => {
    const navigate = useNavigate();

    return useMutation(({
        mutationFn: (userId: number) => createConversation(userId),
        onSuccess: (data) => {
            navigate(`/chats/conversation/${data.data.conversation.id}`)
        },
        onError: (error: any) => {
            toast.error(toast.error(error.response?.data?.message || `Failed to create conversation`));
        }
    }))
}

export const useGetOtherUserInConversation = (conversationId: string) => {
    return useQuery({
        queryKey: ['other-user-in-conversation', conversationId],
        queryFn: () => getOtherUserInConversation(conversationId),
        enabled: !!conversationId,
        select: (data) => {
            // @ts-ignore
            return data.data.other_user as UserType;
        }
    })
}

export const useGetConversationMessages = (conversationId: string, limit = 9) => {
    return useInfiniteQuery({
        queryKey: ['conversation-messages', conversationId],
        queryFn: ({ pageParam }) => getConversationMessages({ conversationId, pageParam, limit }),
        initialPageParam: null as number | null,
        getNextPageParam: (pageParam) => {
            // @ts-ignore
            return pageParam.data.next_cursor
        },
        select: (data) => {
            return {
                pages: data.pages.map(page => ({
                    // @ts-ignore
                    data: page.data.data as MessageType,
                    // @ts-ignore
                    next_cursor: page.data.next_cursor,
                    // @ts-ignore
                    prev_cursor: page.data.prev_cursor,
                    // @ts-ignore
                    has_more: page.data.has_more
                })),
                pageParams: data.pageParams
            }
        }
    })
}

export const useSendMessageToConversation = (conversationId: string) => {
    const queryClient = useQueryClient();
    const { data: user } = useUser();

    return useMutation({
        mutationFn: (data: SendMessageRequestType) => sendMessageToConversation(conversationId, data),
        onMutate: async (newMessage) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({
                queryKey: ['conversation-messages', conversationId],
            })

            const id = uuidv4();

            const optimisticMessage: MessageType = {
                id, // Temporary ID
                content: newMessage.content,
                type: "user",
                created_at: new Date().toISOString(),
                sender: user!,
                reply_id: newMessage.replyId ? parseInt(newMessage.replyId) : null,
                reply: null,
                reactions_count: 0,
                status: 'sending',
                // files: newMessage.files ? Array.from(newMessage.files).map((file, index) => ({
                //     id: -index - 1,
                //     url: URL.createObjectURL(file),
                //     name: file.name,
                //     type: file.type,
                // })) : []
                files: []
            };

            queryClient.setQueryData(['conversation-messages', conversationId], (oldData: any) => {
                if (!oldData) return { pages: [], pageParams: [] };

                // Shallow copy of the old data
                const newPages = [...oldData.pages];
                // Get the first page and copy it, don't mutate the original
                const latestPage = {...newPages[0]};

                // Add the optimistic message to the beginning of the first page
                latestPage.data.data = [optimisticMessage, ...(latestPage.data.data || [])];
                // Update the first page with the new data
                newPages[0] = latestPage;

                return {
                    ...oldData,
                    pages: newPages,
                }
            })

            // Return the optimistic message clientId for later use in onSuccess or onError
            return { id };
        },
        onSuccess: (data, _, context) => {
            if (!context) return;

            // Update the optimistic message with the real data
            queryClient.setQueryData(['conversation-messages', conversationId], (oldData: any) => {
                if (!oldData) return { pages: [], pageParams: [] };

                // @ts-ignore
                const newPages = oldData.pages.map(page => {
                    const updatedData = page.data.data.map((message: MessageType) => {
                        // Replace the optimistic message with the real data
                        if (message.id === context.id) {
                            return {
                                ...data.data.message,
                                status: 'sent',
                            };
                        }
                        return message;
                    })

                    return {
                        ...page,
                        data: {
                            ...page.data,
                            data: updatedData,
                        },
                    }
                })

                return {
                    ...oldData,
                    pages: newPages,
                }
            })
        },
        onError: (_, __, context) => {
            if (!context) return;

            toast.error("Failed to send message. Please try again.");

            // Mark the message as failed
            queryClient.setQueryData(['conversation-messages', conversationId], (old: any) => {
                if (!old) return { pages: [], pageParams: [] };

                const newPages = old.pages.map((page: any) => {
                    const updatedData = page.data.data.map((message: MessageType) => {
                        if (message.id === context.id) {
                            return {
                                ...message,
                                status: 'error'
                            };
                        }
                        return message;
                    });

                    return {
                        ...page,
                        data: {
                            ...page.data,
                            data: updatedData,
                        },
                    }
                });

                return {
                    ...old,
                    pages: newPages
                };
            });
        }
    })
}