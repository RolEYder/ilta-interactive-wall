import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Main from "./pages/Main";
import SingUp from "./pages/SignUp";
import Home from "./pages/Home";
import NotFoundPage from "./pages/404";
import Profile from "./pages/Profile";
import { getAuthentication } from "./components/auth/isAuthenticated";

export default function MainRouter() {
  const [auth, setAuth] = useState();
  useEffect(() => {
    let isAuth = getAuthentication() === true ? true : false;
    console.log(isAuth);
    setAuth({ isAuth });
  }, []);
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SingUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
