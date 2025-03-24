import {useMutation, useQueryClient} from "@tanstack/react-query";
import {storeRoom} from "@/services/room-service.ts";

export const useStoreRoom = () => {
    const queryClient = useQueryClient();

    return useMutation(({
        mutationFn: storeRoom,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['rooms'] });
        }
    }))
}