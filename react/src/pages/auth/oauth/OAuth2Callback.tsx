import {useNavigate, useParams, useSearchParams} from "react-router";
import {useEffect} from "react";
import {handleOAuth2Callback} from "@/services/auth-service.ts";
import {Providers} from "@/types/auth/SocialLogin.ts";

function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const {provider} = useParams<{ provider: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const processCallback = async () => {
            if (!provider || !searchParams.has('code')) {
                throw new Error('Invalid callback');
            }

            await handleOAuth2Callback(provider as Providers, searchParams.get('code')!);
            navigate('/chats');
        }

        processCallback();
    }, []);

    return (
        <></>
    );
}

export default OAuth2Callback;