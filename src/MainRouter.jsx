import { Route, BrowserRouter, Routes } from "react-router-dom"

import Login from "./pages/Login";
import Main from "./pages/Main";
import SingUp from "./pages/SignUp";
import Home from "./pages/Home";
import Explore from "./pages/Explore"
export default function MainRouter() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Main />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/signup" element={<SingUp />} />
                        <Route exact path="/home" element={<Home />} />
                        <Route exact path="/explore" element={<Explore />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}