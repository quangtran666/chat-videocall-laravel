import {useParams, useSearchParams} from "react-router";
import {useEffect} from "react";
import {Providers} from "@/types/auth/SocialLogin.ts";
import {useOAuth2Callback} from "@/hooks/useAuth.ts";
import LoaderFilling from "@/components/utils/loaders/LoaderFilling.tsx";

function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const { provider } = useParams<{ provider: string }>();
    const oauth2CallbackMutation = useOAuth2Callback();

    useEffect(() => {
        const processCallback = async () => {
            if (!provider || !searchParams.has('code')) {
                throw new Error('Invalid callback');
            }

            await oauth2CallbackMutation.mutateAsync({
                provider: provider as Providers,
                code: searchParams.get('code')!
            });
        }

        processCallback();
    }, []);

    return <LoaderFilling />;
}

export default OAuth2Callback;