import { Route, BrowserRouter, Routes } from "react-router-dom"

import Login from "./pages/Login";
import Main from "./pages/Main";
import SingUp from "./pages/SignUp";
import Home from "./pages/Home";
import Explore from "./pages/Explore"
import { isAuthenticated as authController } from "./components/auth/isAuthenticated";
import { Navigate, } from "react-router";

import { AuthContextProvider, useAuthState } from "./config/firebaseConfig";


const AuthenticatedRoute = ({ Children }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`AuthenticatedRoute: ${isAuthenticated}`)
  return isAuthenticated === true ? Children : <Navigate to="/" />;
}
const UnauthenticatedRoute = ({ Children }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`)
  return isAuthenticated === false ? Children : <Navigate to="/home" />;
}

export default function MainRouter() {
  return (
    <>
      <div>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<UnauthenticatedRoute Children={<Main />} />} />
              <Route exact path="/login" element={<UnauthenticatedRoute Children={<Login />} />} />
              <Route exact path="/signup" element={<UnauthenticatedRoute Children={<SingUp />} />} />
              <Route exact path="/home" element={<AuthenticatedRoute Children={<Home />} />} />
              <Route exact path="/explore" element={<AuthenticatedRoute Children={<Explore />} />} />
            </Routes>
          </BrowserRouter>

        </AuthContextProvider>
      </div>
    </>
  )
}