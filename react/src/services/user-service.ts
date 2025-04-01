import axiosInstance from "@/plugins/axios.ts";
import {ExtendedUserType, FriendAction, UserSchema, UserType} from "@/types/user/User.ts";
import {CursorPaginateRequest, CursorPaginateResponse} from "@/types/paginate/cursorPaginateResponse.ts";
import {PaginateRequest, PaginateResponse} from "@/types/paginate/paginateResponse.ts";
import { createCursorParams, createPaginateParams } from "@/types/helper";

export const getMe = async () : Promise<UserType> => {
    const response = await axiosInstance.get("user");

    return UserSchema.parse(response.data);
}

export const getPotentialFriends = async ({ pageParam, limit } : CursorPaginateRequest) => {
    const params = createCursorParams(pageParam, limit);
    const response = await axiosInstance.get<CursorPaginateResponse<ExtendedUserType>>(`user/friends/potential-friends?${params.toString()}`);

    return response.data;
}

export const getSentFriendRequests = async ({ pageParam, limit } : CursorPaginateRequest) => {
    const params = createCursorParams(pageParam, limit);
    const response = await axiosInstance.get<CursorPaginateResponse<ExtendedUserType>>(`user/friends/sent-friend-requests?${params.toString()}`);

    return response.data;
}

export const getReceivedFriendRequests = async ({ pageParam, limit } : CursorPaginateRequest) => {
    const params = createCursorParams(pageParam, limit);
    const response = await axiosInstance.get<CursorPaginateResponse<ExtendedUserType>>(`user/friends/received-friend-requests?${params.toString()}`);

    return response.data;
}

export const getSearchUsers = async ({ query, page, per_page} : PaginateRequest) => {
    const params = createPaginateParams(query, page ?? 1, per_page ?? 12);
    const response = await axiosInstance.get<PaginateResponse<ExtendedUserType>>(`user/search?${params.toString()}`);

    return response.data;
}

export const performFriendAction = async (action: FriendAction, userId: string)=> {
    const response = await axiosInstance.post('user/friends/action', {
        action,
        user_id: userId
    })
    return response.data;
}

export const getUserFriends = async ({ query, page, per_page} : PaginateRequest) => {
    const params = createPaginateParams(query ?? "", page ?? 1, per_page ?? 12);
    const response = await axiosInstance.get<CursorPaginateResponse<ExtendedUserType>>(`user/friends?${params.toString()}`);
    return response.data;
}