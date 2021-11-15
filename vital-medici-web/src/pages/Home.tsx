// @flow 
import { Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

import { PageContent } from '../components/PageContent';
import capa from "../assets/images/vitalSVG.svg";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100vw',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
);

export const Home = () => {

    const classes = useStyles();

    return (
        <PageContent>
            <Container className={classes.root} maxWidth="lg">
                <img src={capa} alt="Vial Medici" />
            </Container>
        </PageContent>
    );
};