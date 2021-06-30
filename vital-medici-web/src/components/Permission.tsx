
import React, { ReactNode, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

type PermissionProps = {
    roles: string[];
    children: ReactNode;
}

export const Permission: React.FC<PermissionProps> = ({ roles, children }) => {

    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const { loggedUser } = useAuth();

    useEffect(() => {


        if (loggedUser && loggedUser.role) {

            setHasPermission(roles.includes(loggedUser.role.name));
        }
    }, [roles, loggedUser]);

    return (
        <>
            {hasPermission && children}
        </>
    );
};