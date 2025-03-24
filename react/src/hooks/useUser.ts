import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {getMe, getPotentialFriends, getReceivedFriendRequests, getSentFriendRequests} from "@/services/user-service.ts";

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getMe,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    })
}

export const useGetPotentialFriends = ( limit = 9 ) => {
    return useInfiniteQuery({
        queryKey: ['potential-friends', limit],
        queryFn: ({ pageParam }) => getPotentialFriends({ pageParam, limit }),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.next_cursor,
        getPreviousPageParam: (firstPage) => firstPage.prev_cursor,
        select: (data) => {
            return {
                pages: data.pages.map(page => ({
                    // @ts-ignore
                    data: page.data.data,
                    next_cursor: page.next_cursor,
                    prev_cursor: page.prev_cursor,
                    has_more: page.has_more
                })),
                pageParams: data.pageParams
            }
        }
    })
}

export const useGetSentFriendRequests = () => {
    return useQuery({
        queryKey: ['sent-friend-requests'],
        queryFn: getSentFriendRequests,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    })
}

export const useGetReceivedFriendRequests = () => {
    return useQuery({
        queryKey: ['received-friend-requests'],
        queryFn: getReceivedFriendRequests,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    })
}