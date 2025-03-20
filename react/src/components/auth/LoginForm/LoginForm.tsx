"use client"

import { useState } from "react"
import { login, socialLogin } from "@/services/auth-service.ts"
import { Providers } from "@/types/auth/SocialLogin.ts"
import { toast } from "sonner"
import SocialLoginButtons from "../SocialLoginButtons"
import LoginFormHeader from "@/components/auth/LoginForm/LoginFormHeader.tsx";
import LoginFormCredentials from "@/components/auth/LoginForm/LoginFormCredentials.tsx";
import LoginFormSeparator from "@/components/auth/LoginForm/LoginFormSeparator.tsx";
import LoginFormFooter from "@/components/auth/LoginForm/LoginFormFooter.tsx";
import {LoginType} from "@/types/auth/Login.ts";
import {useNavigate} from "react-router";

function LoginForm() {
    const [loading, setLoading] = useState(false)
    const [socialLoadingProvider, setSocialLoadingProvider] = useState<Providers | null>(null)
    const navigate = useNavigate();

    async function onSubmit(data: LoginType) {
        setLoading(true)
        try {
            await login(data)
            navigate("/chats")
        } catch (error) {
            toast.error("Login failed.")
        } finally {
            setLoading(false)
        }
    }

    async function onSocialLogin(provider: Providers) {
        setSocialLoadingProvider(provider)
        try {
            await socialLogin(provider)
        } catch (error) {
            toast.error("Social Login failed.")
        } finally {
            setSocialLoadingProvider(null)
        }
    }

    console.log("LoginForm rendered")

    return (
        <div className="space-y-6">
            <LoginFormHeader />

            <LoginFormCredentials
                onSubmit={onSubmit}
                loading={loading}
                disabled={socialLoadingProvider !== null} />

            <LoginFormSeparator />

            <SocialLoginButtons
                onSocialLogin={onSocialLogin}
                loading={loading}
                socialLoadingProvider={socialLoadingProvider}
            />

            <LoginFormFooter />
        </div>
    )
}

export default LoginForm

