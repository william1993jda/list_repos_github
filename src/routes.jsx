import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./Pages/Main";
import Repositorio from "./Pages/Repositorio";

export default function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={Main} />
                <Route path="/repositorio/:repositorio" Component={Repositorio} />
            </Routes>
        </BrowserRouter>
    )
}