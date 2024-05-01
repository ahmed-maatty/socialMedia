import React from "react";
import Nav from "../Components/NavBar/Nav";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../Pages/Auth";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Layout = () => {
const { user } = useSelector((state) => state.app);
return (
    <>
    <ToastContainer />
    <BrowserRouter>
        {
            user ?
            <>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </>
            :
            <>
                <Routes>
                    <Route index path="/" element={<Auth />} />
                </Routes>
            </>
        }
    </BrowserRouter>
    </>
);
};

export default Layout;
