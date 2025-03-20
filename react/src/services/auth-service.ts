import axiosInstance from "@/plugins/axios.ts";
import {LoginType} from "@/types/auth/Login.ts";
import {RegisterRequestType} from "@/types/auth/Register.ts";
import {Providers} from "@/types/auth/SocialLogin";

export const login = async (loginRequest: LoginType) => {
    const response = await axiosInstance.post("login", loginRequest);
    return response.data;
}

export const logout = async () => {
    await axiosInstance.post("logout");
}

export const register = async (registerRequest: RegisterRequestType) => {
    const response = await axiosInstance.post("register", registerRequest);
    return response.data;
}

export const socialLogin = async (provider: Providers) => {
    const response = await axiosInstance.get(`${provider}/redirect`);
    window.location.href = response.data.data.redirect_url;
}

export const handleOAuth2Callback = async (provider: Providers, code: string) => {
    const response = await axiosInstance.get(`${provider}/callback?code=${code}`);
    return response.data;
}