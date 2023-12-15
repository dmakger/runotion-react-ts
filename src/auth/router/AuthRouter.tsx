import React from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes} from "auth/router/routes/routes";
import AuthLayout from "auth/layout/AuthLayout";

const AuthRouter = () => {
    return (
        <AuthLayout>
            <Routes>
                {authRoutes.map(({route}) => {
                    return (
                        <Route key={route.path}
                               path={route.path}
                               element={route.element}
                               children={route.children}
                        />
                    )
                })}
            </Routes>
        </AuthLayout>
    );
};

export default AuthRouter;