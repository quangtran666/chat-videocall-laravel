import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router";
import {getMe} from "@/services/user-service.ts";
import LoaderFilling from "@/components/utils/loaders/LoaderFilling.tsx";

type AuthenticatedRoutesProps = {
    redirectUrl?: string;
}

function AuthenticatedRoutes({ redirectUrl = "/auth/login" } : AuthenticatedRoutesProps) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuthenticateStatus ()
        {
            try {
                await getMe();
                setAuthenticated(true);
            } catch (e) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuthenticateStatus();
    })

    if (loading) {
        console.log("AuthenticatedRoutes check authenticated");

        return <LoaderFilling />
    }

    return authenticated ? <Outlet /> : <Navigate to={redirectUrl} replace />;
}

export default AuthenticatedRoutes;