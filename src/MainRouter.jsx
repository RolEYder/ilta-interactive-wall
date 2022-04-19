import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";
import SingUp from "./pages/SignUp";
import Home from "./pages/Home";
import NotFoundPage from "./pages/404";
import Profile from "./pages/Profile";

export default function MainRouter() {
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
