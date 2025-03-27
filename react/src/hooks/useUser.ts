import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {
    getMe,
    getPotentialFriends,
    getReceivedFriendRequests,
    getSearchUsers,
    getSentFriendRequests
} from "@/services/user-service.ts";

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

export const useGetSentFriendRequests = ( limit = 9) => {
    return useInfiniteQuery({
        queryKey: ['sent-friend-requests'],
        queryFn: ({ pageParam }) => getSentFriendRequests({ pageParam, limit }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => {
            // @ts-ignore
            return lastPage.data.next_cursor
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

export const useGetReceivedFriendRequests = ( limit = 9 ) => {
    return useInfiniteQuery({
        queryKey: ['received-friend-requests'],
        queryFn: ({ pageParam }) => getReceivedFriendRequests({ pageParam, limit }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => {
            // @ts-ignore
            return lastPage.data.next_cursor
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

export const useSearchUsers = (query: string, per_page = 12) => {
    return useInfiniteQuery({
        queryKey: ['search-users', query],
        queryFn: ({ pageParam = 1 }) => getSearchUsers({ query, page: pageParam, per_page }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            // @ts-ignore
            if (lastPage.data.current_page >= lastPage.data.last_page) {
                return undefined
            }

            // @ts-ignore
            return lastPage.data.current_page + 1;
        },
        select: (data) => {
            return {
                pages: data.pages.map(page => ({
                    // @ts-ignore
                    data: page.data.data,
                    // @ts-ignore
                    current_page: page.data.current_page,
                    // @ts-ignore
                    per_page: page.data.per_page,
                    // @ts-ignore
                    total: page.data.total,
                    // @ts-ignore
                    last_page: page.data.last_page,
                    // @ts-ignore
                    has_more: page.data.current_page < page.data.last_page
                })),
                pageParams: data.pageParams
            }
        },
        enabled: query.length > 0,
        // How long data stays fresh before being marked as stale and refetched in the background by React Query
        staleTime: 1000 * 60,
        // How long inactive data remains in cache before being removed
        gcTime: 1000 * 60 * 2,
    })
}