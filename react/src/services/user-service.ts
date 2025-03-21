import axiosInstance from "@/plugins/axios.ts";
import {UserSchema, UserType} from "@/types/user/User.ts";

export const getMe = async () : Promise<UserType> => {
    const response = await axiosInstance.get("user");
    return UserSchema.parse(response.data);
}