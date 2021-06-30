// @flow 
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
    Button,
    createStyles,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
    Theme
} from '@material-ui/core';
import { FaEye, FaEyeSlash, FaCheck, FaUndo } from "react-icons/fa";
import { useSnackbar } from 'notistack';

import api from '../../services/api';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonDanger: {
            background: '#ff4f5b',
            '&:hover': {
                background: '#b84048'
            }
        },
        buttonAuto: {
            background: '#3f50b5',
            '&:hover': {
                background: '#002884'
            }
        },
        buttons: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px'
        },
        adornmentImg: {
            cursor: 'pointer',
        },
        margin: {
            marginBottom: theme.spacing(2),
        }
    })
);

type ResetPasswordFields = {
    current: string,
    newpass: string,
}

type UsuarioProps = {
    id: string,
    handleSubmitResetPassword: () => void,
}

export const ResetPassword: React.FC<UsuarioProps> = ({ id, handleSubmitResetPassword }) => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [values, setValues] = useState<ResetPasswordFields>({ current: '', newpass: '' });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {

        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const formData = {
            current: values.current,
            newpass: values.newpass,
        };

        api.put(`/reset-pass/${id}`, formData).then((res) => {
            enqueueSnackbar(`Senha alterada com sucesso!`, {
                variant: 'success',
            });
            handleSubmitResetPassword();
        });
    }

    function handleGerarAutomatico() {

        api.put(`/generate-pass/${id}`).then((res) => {
            enqueueSnackbar(`Senha alterada com sucesso!`, {
                variant: 'success',
            });
            handleSubmitResetPassword();
        });
    }

    return (
        <Grid container style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                    className={classes.margin}
                    label="Senha Atual"
                    fullWidth
                    type={showCurrent ? 'text' : 'password'}
                    id="current"
                    name="current"
                    placeholder="Senha Atual"
                    value={values.current || ''}
                    onChange={handleOnChange}
                    autoComplete="off"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                { showCurrent
                                    ? <FaEye size={20} className={classes.adornmentImg} onClick={() => { setShowCurrent(false) }} />
                                    : <FaEyeSlash size={20} className={classes.adornmentImg} onClick={() => { setShowCurrent(true) }} />
                                }
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    className={classes.margin}
                    label="Nova Senha"
                    fullWidth
                    type={showNewPass ? 'text' : 'password'}
                    id="newpass"
                    name="newpass"
                    placeholder="Nova Senha"
                    value={values.newpass}
                    onChange={handleOnChange}
                    autoComplete="off"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                { showNewPass
                                    ? <FaEye size={20} className={classes.adornmentImg} onClick={() => { setShowNewPass(false) }} />
                                    : <FaEyeSlash size={20} className={classes.adornmentImg} onClick={() => { setShowNewPass(true) }} />
                                }
                            </InputAdornment>
                        )
                    }}
                />
                <div className={classes.buttons}>
                    <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        startIcon={<FaCheck size={18} />}
                        style={{ marginRight: '10px' }}
                    >
                        Confirmar
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={classes.buttonAuto}
                        fullWidth
                        startIcon={<FaUndo size={16} />}
                        onClick={handleGerarAutomatico}
                    >
                        Gerar Automático
                    </Button>
                </div>
            </form>
        </Grid>

    );
};