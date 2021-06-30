import { createContext, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

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

type AuthContextData = {
    loggedUser: LoggedUser;
    loading: boolean;
    authenticated: boolean;
    handleLogin: ({ username, password }: UserData) => void;
    handleLogout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

type AuthContextProps = {
    children: ReactNode;
}

function AuthContextProvider({ children }: AuthContextProps) {
    const {
        loggedUser, authenticated, loading, handleLogin, handleLogout
    } = useAuth();

    return (
        <AuthContext.Provider value={{
            loggedUser,
            loading,
            authenticated,
            handleLogin,
            handleLogout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
