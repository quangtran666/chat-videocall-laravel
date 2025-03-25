import {Navigate, Outlet} from "react-router";
import LoaderFillingScreen from "@/components/utils/loaders/LoaderFilling/LoaderFillingScreen.tsx";
import {useUser} from "@/hooks/useUser.ts";

type AuthenticatedRoutesProps = {
    redirectUrl?: string;
}

function AuthenticatedRoutes({ redirectUrl = "/auth/login" } : AuthenticatedRoutesProps) {
    const { isLoading, isError, data } = useUser();

    if (isLoading) {
        return <LoaderFillingScreen />
    }

    return !isError && data ? <Outlet /> : <Navigate to={redirectUrl} replace />;
}

export default AuthenticatedRoutes;