import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import LandingPage from "@/pages/landing-page/LandingPage.tsx";
import Login from "@/pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import Layout from "@/pages/chat/Layout.tsx";
import ChatHome from "@/pages/chat/ChatHome.tsx";
import ChatPage from "@/pages/chat/ChatPage.tsx";
import RoomHome from "@/pages/rooms/RoomHome.tsx";
import FindUserPage from "@/pages/find-users/FindUserPage.tsx";
import SettingPage from "@/pages/settings/SettingPage.tsx";
import OAuth2Callback from "@/pages/auth/oauth/OAuth2Callback.tsx";
import AuthLayout from "@/pages/auth/AuthLayout.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route index element={ <LandingPage /> } />
            <Route path="auth" element={ <AuthLayout /> }>
                <Route path="login" element={ <Login /> }/>
                <Route path="register" element={ <Register /> }/>
                <Route path="oauth2/callback/:provider" element={ <OAuth2Callback /> } />
            </Route>
            <Route path="chats" element={ <Layout /> } >
                <Route index element={ <ChatHome />} />
                <Route path=":chatId" element={ <ChatPage />} />
            </Route>
            <Route path="rooms" element={ <Layout /> }>
                <Route index element={ <RoomHome /> } />
            </Route>
            <Route path="find-users" element={ <Layout /> }>
                <Route index element={ <FindUserPage /> } />
            </Route>
            <Route path="settings" element={ <Layout /> }>
                <Route index element={ <SettingPage /> } />
            </Route>
        </Routes>
    </BrowserRouter>
)
