// @flow 
import React, { ReactNode } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { Header } from './Header';

type PageContentProps = {
    children: ReactNode;
}

const useStyle = makeStyles(() =>
    createStyles({
        root: {
            height: '100vh',
        },
        main: {
            width: '100%',
            position: 'absolute',
            top: '50px',
            padding: '10px'
        }
    })
)

export const PageContent = ({ children }: PageContentProps) => {

    const classes = useStyle();

    return (
        <div className={classes.root}>
            <Header />
            <main className={classes.main}>
                {children}
            </main>
        </div>
    );
};