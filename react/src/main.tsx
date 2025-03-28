import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import LandingPage from "@/pages/landing-page/LandingPage.tsx";
import Login from "@/pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import Layout from "@/pages/chat/Layout.tsx";
import ChatHome from "@/pages/chat/ChatHome.tsx";
import ConversationChatPage from "@/pages/chat/ConversationChatPage.tsx";
import RoomHome from "@/pages/rooms/RoomHome.tsx";
import FindUserPage from "@/pages/find-users/FindUserPage.tsx";
import SettingPage from "@/pages/settings/SettingPage.tsx";
import OAuth2Callback from "@/pages/auth/oauth/OAuth2Callback.tsx";
import AuthenticatedRoutes from "@/routes/AuthenticatedRoutes.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "@/components/ui/sonner.tsx";
import FriendsPage from "@/pages/friend/FriendsPage.tsx";
import RoomChatPage from "@/pages/chat/RoomChatPage.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
        mutations: {

        }
    }
});

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route index element={ <LandingPage /> } />
                <Route path="auth" >
                    <Route path="login" element={ <Login /> }/>
                    <Route path="register" element={ <Register /> }/>
                    <Route path="oauth2/callback/:provider" element={ <OAuth2Callback /> } />
                </Route>
                <Route element={ <AuthenticatedRoutes/> }>
                    <Route path="chats" element={ <Layout /> } >
                        <Route index element={ <ChatHome />} />
                        <Route path="conversation/:chatId" element={ <ConversationChatPage />} />
                        <Route path="room/:chatRoomId" element={ <RoomChatPage />} />
                    </Route>
                    <Route path="rooms" element={ <Layout /> }>
                        <Route index element={ <RoomHome /> } />
                    </Route>
                    <Route path="friends" element={ <Layout /> }>
                        <Route index element={ <FriendsPage /> } />
                    </Route>
                    <Route path="find-users" element={ <Layout /> }>
                        <Route index element={ <FindUserPage /> } />
                    </Route>
                    <Route path="settings" element={ <Layout /> }>
                        <Route index element={ <SettingPage /> } />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
    </QueryClientProvider>
)
