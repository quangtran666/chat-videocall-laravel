import {Navigate, Outlet} from "react-router";
import LoaderFilling from "@/components/utils/loaders/LoaderFilling.tsx";
import {useUser} from "@/hooks/useUser.ts";

type AuthenticatedRoutesProps = {
    redirectUrl?: string;
}

function AuthenticatedRoutes({ redirectUrl = "/auth/login" } : AuthenticatedRoutesProps) {
    const { isLoading, isError, data } = useUser();

    if (isLoading) {
        return <LoaderFilling />
    }

    return !isError && data ? <Outlet /> : <Navigate to={redirectUrl} replace />;
}

export default AuthenticatedRoutes;