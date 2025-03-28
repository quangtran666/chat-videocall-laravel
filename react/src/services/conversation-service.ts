import axiosInstance from "@/plugins/axios.ts";

export const createConversation = async (userId: number) => {
    const response = await axiosInstance.post('user/conversations', {
        user_id: userId
    });
    return response.data;
}