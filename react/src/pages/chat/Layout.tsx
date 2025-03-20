import Sidebar from "@/components/sidebar/Sidebar.tsx";
import {Outlet} from "react-router";

function Layout() {
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Layout;