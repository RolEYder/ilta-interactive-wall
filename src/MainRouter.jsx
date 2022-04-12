import { Route, BrowserRouter, Routes } from "react-router-dom"
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SingUp from "./pages/SignUp";
import Home from "./pages/Home";
import Explore from "./pages/Explore"
import NotFoundPage from "./pages/404";
import Profile from "./pages/Profile";
import { getAuthentication } from "./components/auth/isAuthenticated";

export default function MainRouter() {
  const [auth, setAuth] = useState();
  useEffect(() => {
    let isAuth = getAuthentication() ? true : false
    setAuth({ isAuth })

  }, [])
  return (
    <>
      <div>

        <BrowserRouter>
          <Routes>

            <Route
              path="/"
              element={
                // eslint-disable-next-line react/jsx-no-undef
                auth ? <Navigate to="/home" /> : (<Main />)
              }
            />
            <Route
              path="/home"
              element={
                auth ? <Home /> : <Navigate to="/" />
              }
            />
            <Route
              path="/login"
              element={
                auth ? <Home /> : <Login />
              }
            />
            <Route
              path="/signup"
              element={
                auth ? <Home /> : <SingUp />
              }
            />
            <Route
              path="/explore"
              element={
                auth === false ? <Navigate to="/" /> : <Explore />
              }
            />
            <Route
              path="/profile"
              element={
                auth === false ? <Navigate to="/" /> : <Profile />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}