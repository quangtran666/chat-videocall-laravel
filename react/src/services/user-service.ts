import axiosInstance from "@/plugins/axios.ts";
import {ExtendedUserType, UserSchema, UserType} from "@/types/user/User.ts";
import {CursorPaginateRequest, CursorPaginateResponse} from "@/types/paginate/cursorPaginateResponse.ts";

export const getMe = async () : Promise<UserType> => {
    const response = await axiosInstance.get("user");

    return UserSchema.parse(response.data);
}

const createParams = (pageParam: number | null, limit: number) => {
    const params = new URLSearchParams();
    if (pageParam) params.append('cursor', pageParam.toString());
    params.append('limit', limit.toString());

    return params;
}

export const getPotentialFriends = async ({ pageParam, limit } : CursorPaginateRequest) => {
    const params = createParams(pageParam, limit);
    const response = await axiosInstance.get<CursorPaginateResponse<ExtendedUserType>>(`user/friends/potential-friends?${params.toString()}`);

    return response.data;
}

export const getSentFriendRequests = async ({ pageParam, limit } : CursorPaginateRequest) => {
    const params = createParams(pageParam, limit);
    const response = await axiosInstance.get<CursorPaginateResponse<ExtendedUserType>>(`user/friends/sent-friend-requests?${params.toString()}`);

    return response.data;
}

export const getReceivedFriendRequests = async ({ pageParam, limit } : CursorPaginateRequest) => {
    const params = createParams(pageParam, limit);
    const response = await axiosInstance.get<CursorPaginateResponse<ExtendedUserType>>(`user/friends/received-friend-requests?${params.toString()}`);

    return response.data;
}
