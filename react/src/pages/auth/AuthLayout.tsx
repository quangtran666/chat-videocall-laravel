import {Outlet} from "react-router";
import {Toaster} from "@/components/ui/sonner.tsx";

function AuthLayout() {
    return (
        <>
            <Outlet />
            <Toaster />
        </>
    );
}

export default AuthLayout;