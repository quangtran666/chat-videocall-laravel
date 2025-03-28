import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner"
import {createConversation} from "@/services/conversation-service.ts";
import { useNavigate } from "react-router";

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