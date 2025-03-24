import axiosInstance from "@/plugins/axios.ts";
import {UserSchema, UserType} from "@/types/user/User.ts";

export const getMe = async () : Promise<UserType> => {
    const response = await axiosInstance.get("user");
    return UserSchema.parse(response.data);
}

export const getPotentialFriends = async () => {
    const response = await axiosInstance.get("user/friends/potential-friends");
    return response.data;
}

export const getSentFriendRequests = async () => {
    const response = await axiosInstance.get("user/friends/sent-friend-requests");
    return response.data;
}

export const getReceivedFriendRequests = async () => {
    const response = await axiosInstance.get("user/friends/received-friend-requests");
    return response.data;
}
