import axiosInstance from "@/plugins/axios.ts";
import {ExtendedUserType, UserSchema, UserType} from "@/types/user/User.ts";
import {CursorPaginateRequest, CursorPaginateResponse} from "@/types/paginate/cursorPaginateResponse.ts";
import {PaginateRequest, PaginateResponse} from "@/types/paginate/paginateResponse.ts";

export const getMe = async () : Promise<UserType> => {
    const response = await axiosInstance.get("user");

    return UserSchema.parse(response.data);
}

const createCursorParams = (pageParam: number | null, limit: number) => {
    const params = new URLSearchParams();
    if (pageParam) params.append('cursor', pageParam.toString());
    params.append('limit', limit.toString());

    return params;
}

const createPaginateParams = ( query: string, page: number, per_page: number ) => {
    const params = new URLSearchParams();
    params.append('query', query);
    params.append('per_page', per_page.toString());
    params.append('page', page.toString());

    return params;
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