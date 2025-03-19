import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import LandingPage from "@/routes/landing-page/LandingPage.tsx";
import Login from "@/routes/auth/Login.tsx";
import Register from "@/routes/auth/Register.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route index element={ <LandingPage /> } />
            <Route path="auth">
                <Route path="login" element={ <Login /> }/>
                <Route path="register" element={ <Register /> }/>
            </Route>
        </Routes>
    </BrowserRouter>
)
