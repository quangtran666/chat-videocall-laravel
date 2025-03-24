import {RoomRequest} from "@/types/room/Room.ts";
import axiosInstance from "@/plugins/axios.ts";

export const storeRoom = async (room: RoomRequest) => {
    const response = await axiosInstance.post('rooms', room);
    return response.data;
}