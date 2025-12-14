import {  Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import React from "react";
import { Response } from "../pages/Response";

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/response" element={<Response />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

