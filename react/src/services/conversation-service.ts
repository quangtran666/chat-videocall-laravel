import axiosInstance from "@/plugins/axios.ts";
import {CursorPaginateResponse} from "@/types/paginate/cursorPaginateResponse.ts";
import {createCursorParams} from "@/types/helper.ts";
import {MessageCursorPaginateRequest, MessageType, SendMessageRequestType} from "@/types/conversation/Conversation.ts";
import {UserType} from "@/types/user/User.ts";

export const createConversation = async (userId: number) => {
    const response = await axiosInstance.post('user/conversations', {
        user_id: userId
    });
    return response.data;
}

export const getOtherUserInConversation = async (conversationId: string) => {
    const response = await axiosInstance.get<UserType>(`user/conversations/${conversationId}/other-user`);
    return response.data;
}

export const getConversationMessages = async ({ conversationId , pageParam, limit} : MessageCursorPaginateRequest) => {
    const params = createCursorParams(pageParam, limit);
    const response = await axiosInstance.get<CursorPaginateResponse<MessageType>>(`user/conversations/${conversationId}/messages?${params.toString()}`);

    return response.data;
}

export const sendMessageToConversation = async (conversationId: string, data: SendMessageRequestType) => {
    const formData = new FormData();
    formData.append('content', data.content);
    if (data.replyId) {
        formData.append('reply_id', data.replyId.toString());
    }
    if (data.files) {
        data.files.forEach((file) => {
            formData.append('files[]', file);
        });
    }
    const response = await axiosInstance.post(`user/conversations/${conversationId}/messages`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    return response.data;
}