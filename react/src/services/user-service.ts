import axiosInstance from "@/plugins/axios.ts";

export const getMe = async () => {
    const response = await axiosInstance.get("user");
    return response.data;
}