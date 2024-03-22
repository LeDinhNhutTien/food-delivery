import React from 'react';
import { Route } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Login from '../components/Login'; // Import your Login component

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            AuthService.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Login {...props} /> // Render your Login component or any other component for redirection
            )
        }
    />
);

export default PrivateRoute;
