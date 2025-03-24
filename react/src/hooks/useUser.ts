import {useQuery} from "@tanstack/react-query";
import {getMe, getPotentialFriends, getReceivedFriendRequests, getSentFriendRequests} from "@/services/user-service.ts";

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getMe,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    })
}

export const useGetPotentialFriends = () => {
    return useQuery({
        queryKey: ['potential-friends'],
        queryFn: getPotentialFriends,
        retry: 1,
        staleTime: 1000 * 60 * 5,
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