import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function AppToast() {
    const { theme } = useSelector(state => state.themes);
    return (
        <>
            <ToastContainer theme={theme === "light" ? "light" : "dark"} />
        </>
    );
}

export default AppToast;