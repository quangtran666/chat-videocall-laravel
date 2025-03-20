import {useState} from "react";
import {RegisterType} from "@/types/auth/Register.ts";
import {register, socialLogin} from "@/services/auth-service.ts";
import RegisterFormHeader from "@/components/auth/RegisterForm/RegisterFormHeader.tsx";
import RegisterFormCredentials from "@/components/auth/RegisterForm/RegisterFormCredentials.tsx";
import {Providers} from "@/types/auth/SocialLogin.ts";
import RegisterFormSeparator from "@/components/auth/RegisterForm/RegisterFormSeparator.tsx";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons.tsx";
import {toast} from "sonner";
import RegisterFormFooter from "@/components/auth/RegisterForm/RegisterFormFooter.tsx";
import {useNavigate} from "react-router";

function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const [socialLoadingProvider, setSocialLoadingProvider] = useState<Providers | null>(null)
    const navigate = useNavigate();

    async function onSubmit(data: RegisterType) {
        setLoading(true);
        try {
            const {terms, ...registerRequest} = data;
            await register(registerRequest);
            navigate("/chats");
        } catch (error) {
            toast.error("Registration failed.");
        } finally {
            setLoading(false);
        }
    }

    async function onSocialLogin(provider: Providers) {
        setSocialLoadingProvider(provider);
        try {
            await socialLogin(provider);
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
                loading={loading}
                disabled={socialLoadingProvider !== null}
            />

            <RegisterFormSeparator />

            <SocialLoginButtons
                onSocialLogin={onSocialLogin}
                loading={loading}
                socialLoadingProvider={socialLoadingProvider}
            />

            <RegisterFormFooter />
        </div>
    );
}

export default RegisterForm;