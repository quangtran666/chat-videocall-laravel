import {useMutation, useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {LoginType} from "@/types/auth/Login.ts";
import {handleOAuth2Callback, login, logout, register, socialLogin} from "@/services/auth-service.ts";
import {RegisterRequestType} from "@/types/auth/Register.ts";
import {Providers} from "@/types/auth/SocialLogin.ts";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: LoginType) => login(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({queryKey: ['user'], type: 'inactive'})
            navigate('/chats');
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/auth/login', { replace: true });
        }
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: RegisterRequestType) => register(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/chats');
        }
    });
};

export const useSocialLogin = () => {
    return useMutation({
        mutationFn: (provider: Providers) => socialLogin(provider)
    });
};

export const useOAuth2Callback = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ provider, code }: { provider: Providers, code: string }) =>
            handleOAuth2Callback(provider, code),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/chats');
        }
    });
};