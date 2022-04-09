import React from "react";
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
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SingUp />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}