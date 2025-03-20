import {useQuery} from "@tanstack/react-query";
import {getMe} from "@/services/user-service.ts";

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getMe,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    })
}