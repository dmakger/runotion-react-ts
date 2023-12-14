import React from 'react';
import {Route, Routes} from "react-router-dom";
import {mainRoutes} from "main/router/routes/routes";
import MainLayout from "main/layout/ui/MainLayout";

const MainRouter = () => {
    return (
        <MainLayout>
            <Routes>
                {mainRoutes.map(({route}) => {
                    return (
                        <Route key={route.path}
                               path={route.path}
                               element={route.element}
                               children={route.children}
                        />
                    )
                })}
            </Routes>
        </MainLayout>
    );
};

export default MainRouter;