import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext.js';

function ProtectedRoute ({ component: Component, ...props }) {
    const isLoggedIn = useContext(LoginContext);

    return (
        <Route>
            {() =>
            isLoggedIn ? <Component {...props} /> : <Navigate to="/signin" />
            }
        </Route>
    );
};

export default ProtectedRoute;