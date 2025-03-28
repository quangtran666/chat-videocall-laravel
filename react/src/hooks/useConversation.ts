import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner"
import {createConversation} from "@/services/conversation-service.ts";

export const useCreateConversation = () => {
    return useMutation(({
        mutationFn: (userId: number) => createConversation(userId),
        onSuccess: () => {
            toast.success("Conversation created successfully.");
        },
        onError: (error: any) => {
            toast.error(toast.error(error.response?.data?.message || `Failed to create conversation`));
        }
    }))
}