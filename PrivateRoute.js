import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                currentUser ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/signin", state: { from: location } }} />
                )
            }
        />
    );
}

export default PrivateRoute;