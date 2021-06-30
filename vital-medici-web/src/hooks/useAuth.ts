import { useState, useEffect, useCallback } from 'react';

import api from '../services/api';
import history from '../utils/history';

type UserData = {
    username: string;
    password: string;
}

type Role = {
    name: string;
}

type LoggedUser = {
    username: string;
    role: Role;
}

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState<LoggedUser>({} as LoggedUser)

    useEffect(() => {
        const token = localStorage.getItem('@token');
        const user = localStorage.getItem('@loggedUser');
        if (token && user) {
            const userLogged = JSON.parse(user);
            setLoggedUser(userLogged);
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    const handleLogin = useCallback(async ({ username, password }: UserData) => {
        const formdata = {
            username,
            password
        };
        const { data: { user, token } } = await api.post('/users/authenticate', formdata);

        localStorage.setItem('@token', token);
        localStorage.setItem('@loggedUser', JSON.stringify({
            username: user.username,
            role: {
                name: user.role.name
            }
        }));
        setAuthenticated(true);
        history.push('/');
    }, []);

    const handleLogout = useCallback(() => {
        setAuthenticated(false);
        localStorage.removeItem('@token');
        localStorage.removeItem('@loggedUser');
        api.defaults.headers.Authorization = undefined;
        history.push('/login');
    }, [])

    return { loggedUser, authenticated, loading, handleLogin, handleLogout };
}