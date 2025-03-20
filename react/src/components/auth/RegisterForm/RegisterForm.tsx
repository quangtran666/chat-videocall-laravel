import {useState} from "react";
import {RegisterType} from "@/types/auth/Register.ts";
import RegisterFormHeader from "@/components/auth/RegisterForm/RegisterFormHeader.tsx";
import RegisterFormCredentials from "@/components/auth/RegisterForm/RegisterFormCredentials.tsx";
import {Providers} from "@/types/auth/SocialLogin.ts";
import RegisterFormSeparator from "@/components/auth/RegisterForm/RegisterFormSeparator.tsx";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons.tsx";
import {toast} from "sonner";
import RegisterFormFooter from "@/components/auth/RegisterForm/RegisterFormFooter.tsx";
import {useRegister, useSocialLogin} from "@/hooks/useAuth.ts";

function RegisterForm() {
    const [socialLoadingProvider, setSocialLoadingProvider] = useState<Providers | null>(null)

    const registerMutation = useRegister();
    const socialLoginMutation = useSocialLogin();

    async function onSubmit(data: RegisterType) {
        try {
            const { terms, ...registerRequest } = data;
            await registerMutation.mutateAsync(registerRequest);
        } catch (error) {
            toast.error("Registration failed.");
        }
    }

    async function onSocialLogin(provider: Providers) {
        setSocialLoadingProvider(provider);
        try {
            await socialLoginMutation.mutateAsync(provider);
        } catch (error) {
            toast.error("Social Login failed.");
        } finally {
            setSocialLoadingProvider(null);
        }
    }

    return (
        <div className="space-y-6">
            <RegisterFormHeader />

            <RegisterFormCredentials
                onSubmit={onSubmit}
                loading={registerMutation.isPending}
                disabled={socialLoadingProvider !== null}
            />

            <RegisterFormSeparator />

            <SocialLoginButtons
                onSocialLogin={onSocialLogin}
                loading={registerMutation.isPending}
                socialLoadingProvider={socialLoadingProvider}
            />

            <RegisterFormFooter />
        </div>
    );
}

export default RegisterForm;