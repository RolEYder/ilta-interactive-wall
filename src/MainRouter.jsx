import { Route, BrowserRouter, Routes } from "react-router-dom"

import Login from "./pages/Login";
import Home from "./pages/Home";
import SingUp from "./pages/SignUp";
export default function MainRouter() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/signup" element={<SingUp />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}