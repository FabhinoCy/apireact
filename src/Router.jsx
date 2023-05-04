import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Page/Home/Home";
import LoginPage from "./Page/Login/LoginPage";
import React from "react";

export const Router = (props) => {
    return (
        //TODO Make router with Home page and Login page
        <div>
            <Routes>
                <Route index element={<Home/>}/>
                <Route element={<LoginPage/>} path="/login"/>
            </Routes>
        </div>
    )
}