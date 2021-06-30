// @flow 
import * as React from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Usuário } from './pages/Usuário';
import useAuth from './hooks/useAuth';

interface CustomRouteProps extends RouteProps {
    isPrivate?: boolean;
}

const CustomRoute: React.FC<CustomRouteProps> = ({ isPrivate, ...rest }) => {
    const { loading, authenticated } = useAuth();


    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (isPrivate && !authenticated) {
        return <Redirect to="/login" />
    }

    return <Route {...rest} />;
}


export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <CustomRoute exact path="/login" component={Login} />
                <CustomRoute isPrivate exact path="/" component={Home} />
                <CustomRoute isPrivate exact path="/usuarios" component={Usuário} />
            </Switch>
        </BrowserRouter>
    );
};

