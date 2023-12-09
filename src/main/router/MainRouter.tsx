import React from 'react';
import { Route, Routes } from "react-router-dom";
import {mainRoutes} from "main/router/routes";
import MainLayout from "main/layout/ui/MainLayout";

const MainRouter = () => {
    return (
        <MainLayout>
            <Routes>
                {mainRoutes.map(({ path, element }) => {
                    return <Route key={path} path={path} element={element} />
                })}
            </Routes>
        </MainLayout>
    );
};

export default MainRouter;