import React from "react";
import { Route, BrowserRouter, Redirect, Routes } from "react-router-dom"
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function MainRouter() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}