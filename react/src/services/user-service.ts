import axiosInstance from "@/plugins/axios.ts";
import {ExtendedUserType, UserSchema, UserType} from "@/types/user/User.ts";
import {CursorPaginateRequest, CursorPaginateResponse} from "@/types/paginate/cursorPaginateResponse.ts";

export const getMe = async () : Promise<UserType> => {
    const response = await axiosInstance.get("user");
    return UserSchema.parse(response.data);
}

export const getPotentialFriends = async ({ pageParam, limit } : CursorPaginateRequest) => {
    const params = new URLSearchParams();
    if (pageParam) params.append('cursor', pageParam.toString());
    params.append('limit', limit.toString());
    const response = await axiosInstance.get<CursorPaginateResponse<ExtendedUserType>>(`user/friends/potential-friends?${params.toString()}`);

    return response.data;
}

export const getSentFriendRequests = async () => {
    const response = await axiosInstance.get<ExtendedUserType>("user/friends/sent-friend-requests");
    return response.data;
}

export const getReceivedFriendRequests = async () => {
    const response = await axiosInstance.get<ExtendedUserType>("user/friends/received-friend-requests");
    return response.data;
}
