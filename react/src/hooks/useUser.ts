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
        queryKey: ['potential-friends'],
        queryFn: ({ pageParam }) => getPotentialFriends({ pageParam, limit }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => {
            // @ts-ignore
            return lastPage.data.next_cursor
        },
        getPreviousPageParam: (firstPage) => {
            // @ts-ignore
            return firstPage.data.prev_cursor
        },
        select: (data) => {
            return {
                pages: data.pages.map(page => ({
                    // @ts-ignore
                    data: page.data.data,
                    // @ts-ignore
                    next_cursor: page.data.next_cursor,
                    // @ts-ignore
                    prev_cursor: page.data.prev_cursor,
                    // @ts-ignore
                    has_more: page.data.has_more
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