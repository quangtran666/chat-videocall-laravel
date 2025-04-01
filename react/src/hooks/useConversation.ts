import {useInfiniteQuery, useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner"
import {
    createConversation,
    getConversationMessages,
    getOtherUserInConversation
} from "@/services/conversation-service.ts";
import { useNavigate } from "react-router";
import {MessageType} from "@/types/conversation/Conversation.ts";
import {UserType} from "@/types/user/User.ts";

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