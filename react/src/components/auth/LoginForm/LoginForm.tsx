import { useState } from "react"
import { Providers } from "@/types/auth/SocialLogin.ts"
import { toast } from "sonner"
import SocialLoginButtons from "../SocialLoginButtons"
import LoginFormHeader from "@/components/auth/LoginForm/LoginFormHeader.tsx";
import LoginFormCredentials from "@/components/auth/LoginForm/LoginFormCredentials.tsx";
import LoginFormSeparator from "@/components/auth/LoginForm/LoginFormSeparator.tsx";
import LoginFormFooter from "@/components/auth/LoginForm/LoginFormFooter.tsx";
import {LoginType} from "@/types/auth/Login.ts";
import {useLogin, useSocialLogin} from "@/hooks/useAuth.ts";

function LoginForm() {
    const [socialLoadingProvider, setSocialLoadingProvider] = useState<Providers | null>(null)
    const loginMutation = useLogin();
    const socialLoginMutation = useSocialLogin();

    async function onSubmit(data: LoginType) {
        try {
            await loginMutation.mutateAsync(data);
        } catch (error) {
            toast.error("Login failed.")
        }
    }

    async function onSocialLogin(provider: Providers) {
        setSocialLoadingProvider(provider)
        try {
            await socialLoginMutation.mutateAsync(provider)
        } catch (error) {
            toast.error("Social Login failed.")
        } finally {
            setSocialLoadingProvider(null)
        }
    }

    return (
        <div className="space-y-6">
            <LoginFormHeader />

            <LoginFormCredentials
                onSubmit={onSubmit}
                loading={loginMutation.isPending}
                disabled={socialLoadingProvider !== null} />

            <LoginFormSeparator />

            <SocialLoginButtons
                onSocialLogin={onSocialLogin}
                loading={loginMutation.isPending}
                socialLoadingProvider={socialLoadingProvider}
            />

            <LoginFormFooter />
        </div>
    )
}

export default LoginForm

