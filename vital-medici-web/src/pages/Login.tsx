// @flow 

import { Button, createStyles, Grid, InputAdornment, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaUser, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';

import vitalLogo from '../assets/images/vitalSVG.svg';
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(45deg, #494d4b, 50%, #808080 90%)'
        },
        gridLog: {
            padding: '25px',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
        },
        imgLogo: {
            width: '120px',
        },
        typograph: {
            marginTop: '35px',
            color: 'var(--white)',
        },
        gridForm: {
            padding: '25px',
            borderRadius: '10px',
            background: 'var(--gray-50)',

        },
        adornmentImg: {
            cursor: 'pointer',
            color: theme.palette.primary.main
        },
        button: {
            color: '#fff',
            margin: theme.spacing(1),
        },
        margin: {
            margin: theme.spacing(1),
        }
    })
);

type UserData = {
    username: string;
    password: string;
};

export const Login = () => {

    const initialValues = {
        username: 'vm_admin',
        password: '123456'
    }

    const [values, setValues] = useState<UserData>(initialValues);

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const { handleLogin } = useAuth();

    function handleSubmitLogin(event: FormEvent) {
        event.preventDefault();

        handleLogin(values);

        setValues(initialValues);
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {

        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    return (

        <Grid
            container
            className={classes.root}
            direction="row"
            justify="center"
            alignItems="center"

        >
            <Grid
                item
                xs={4}
                className={classes.gridLog}
            >
                <img className={classes.imgLogo} src={vitalLogo} alt="Vital Medici" />
                <Typography variant="h4" className={classes.typograph} >
                    Faça seu login na plataforma
                </Typography>
            </Grid>
            <Grid
                item
                xs={4}
                className={classes.gridForm}
            >
                <form onSubmit={handleSubmitLogin}>

                    <TextField
                        className={classes.margin}
                        label="Usuário"
                        fullWidth
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Usuário"
                        variant="outlined"
                        value={values.username}
                        onChange={handleOnChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaUser size={20} className={classes.adornmentImg} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className={classes.margin}
                        label="Senha"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Senha"
                        value={values.password}
                        onChange={handleOnChange}
                        autoComplete="off"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaKey size={20} className={classes.adornmentImg} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    { showPassword
                                        ? <FaEye size={20} className={classes.adornmentImg} onClick={() => { setShowPassword(false) }} />
                                        : <FaEyeSlash size={20} className={classes.adornmentImg} onClick={() => { setShowPassword(true) }} />
                                    }
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button type="submit" className={classes.button} variant="contained" fullWidth color="primary">
                        Entrar
                </Button>

                </form>
            </Grid>
        </Grid >
    );
};