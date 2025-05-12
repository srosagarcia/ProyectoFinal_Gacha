import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";

export default function Layout({ children }) {
    const location = useLocation();
    const hideNav = ["/", "/register", "/menu"].includes(location.pathname);

    return (
        <>
            {!hideNav && <NavBar />}
            {children}
        </>
    );
}
