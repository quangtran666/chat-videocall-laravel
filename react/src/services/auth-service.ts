import axiosInstance from "@/plugins/axios.ts";
import {LoginType} from "@/types/auth/Login.ts";
import {RegisterRequestType} from "@/types/auth/Register.ts";

export const login = async (loginRequest : LoginType)=> {
    const response = await axiosInstance.post("login", loginRequest);
    return response.data;
}

export const logout = async () => {
    await axiosInstance.post("logout");
}

export const register = async (registerRequest : RegisterRequestType)=> {
    const response = await axiosInstance.post("register", registerRequest);
    return response.data;
}