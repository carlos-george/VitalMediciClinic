import {
    Button,
    createStyles,
    Grid,
    InputAdornment,
    makeStyles,
    MenuItem,
    TextField,
    Theme
} from "@material-ui/core";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTimes, FaUserEdit, FaEye, FaEyeSlash, FaUndo, FaCheck } from "react-icons/fa";

import api from "../../services/api";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        span: {
            fontWeight: 400,
            marginLeft: '10px',
        },
        buttonDanger: {
            background: '#ff4f5b',
            '&:hover': {
                background: '#b84048'
            }
        },
        buttonSuccess: {
            background: '#43da82',
            '&:hover': {
                background: '#2b9457'
            }
        },
        buttonReset: {
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
        gridItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        adornmentImg: {
            cursor: 'pointer',
        },
        margin: {
            marginBottom: theme.spacing(2),
        }
    })
);

type UsuarioFields = {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    isactive: boolean;
    datebirth: string;
    role_id: string;
}

type UsuarioShowProps = {
    user: UsuarioFields;
    handleSubmitEdit: (user: UsuarioFields) => void;
    handleResetPassword: () => void;
    hamdleDesacticeActiveUser: (id: string) => void;
}

type Role = {
    id: string;
    description: string;
}

const UsuarioAddEdit: React.FC<UsuarioShowProps> = ({
    user,
    handleSubmitEdit,
    handleResetPassword,
    hamdleDesacticeActiveUser
}) => {

    const classes = useStyles();

    const [values, setValues] = useState<UsuarioFields>(user);
    const [showPassword, setShowPassword] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);


    useEffect(() => {
        api.get('/roles').then((response) => {
            const { roles } = response.data;

            setRoles(roles);
            setValues(user);
        });
    }, [user]);

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {

        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        console.debug('Values: ', values);
        handleSubmitEdit(values);
    }

    function handleOnBlur() {
        if ((!user.id || user.id === '')
            && (
                (values.firstname && values.firstname !== '')
                &&
                (values.lastname && values.lastname !== '')
                &&
                (values.datebirth && values.datebirth !== '')
            )
        ) {

            const date = values.datebirth.split('-');

            const year = date[0];
            const month = date[1];
            const day = date[2];

            const firstLetter = values.lastname.charAt(0);

            const createdUserName = `${values.firstname}${firstLetter}_${day}${month}${year}`;
            setValues({
                ...values,
                username: createdUserName.toLowerCase()
            });
        }

    }

    return (
        <Grid container direction="column" style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
                <Grid item xs={12} className={classes.gridItem}>

                    <TextField
                        className={classes.margin}
                        label="Nome"
                        fullWidth
                        type="text"
                        id="firtname"
                        name="firstname"
                        placeholder="Nome"
                        variant="outlined"
                        value={values.firstname || ''}
                        onChange={handleOnChange}
                        style={{ marginRight: '15px' }}
                    />

                    <TextField
                        className={classes.margin}
                        label="Sobrenome"
                        fullWidth
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Sobrenome"
                        variant="outlined"
                        value={values.lastname || ''}
                        onChange={handleOnChange}
                    />

                </Grid>
                <TextField
                    className={classes.margin}
                    label="Data de Nascimento"
                    fullWidth
                    type="date"
                    id="date"
                    name="datebirth"
                    placeholder="Data de Nascimento"
                    variant="outlined"
                    value={values.datebirth || ''}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    className={classes.margin}
                    label="Nome de Usuário"
                    disabled
                    fullWidth
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nome de Usuário"
                    variant="outlined"
                    value={values.username || ''}
                    onChange={handleOnChange}
                />
                <Grid item xs={12} className={classes.gridItem}>

                    {(!user.id || user.id === '') && (
                        <TextField
                            className={classes.margin}
                            label="Senha"
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Senha"
                            value={values.password || ''}
                            onChange={handleOnChange}
                            autoComplete="off"
                            variant="outlined"
                            style={{ marginRight: '15px' }}
                            InputProps={{
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
                    )
                    }
                    <TextField
                        className={classes.margin}
                        id="perfil"
                        select
                        fullWidth
                        name="perfil"
                        label="Perfil"
                        placeholder="Perfil"
                        value={values.role_id || ''}
                        onChange={(event) => {
                            setValues({
                                ...values,
                                role_id: event.target.value + ''
                            })
                        }}
                        variant="outlined"
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.description}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <div className={classes.buttons}>
                    <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        startIcon={<FaUserEdit size={18} />}
                        style={user.id ? { marginRight: '10px' } : {}}
                    >
                        Gravar
                    </Button>
                    {user.id && (
                        <Button
                            size="small"
                            variant="contained"
                            fullWidth
                            startIcon={<FaUndo size={16} />}
                            className={classes.buttonReset}
                            onClick={handleResetPassword}
                            style={{ marginRight: '10px' }}
                        >
                            Resetar Senha
                        </Button>
                    )}
                    {user.id
                        ? (user.isactive
                            ? (
                                <Button
                                    size="small"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<FaTimes size={18} />}
                                    className={classes.buttonDanger}
                                    onClick={() => {
                                        hamdleDesacticeActiveUser(user.id);
                                    }}
                                >
                                    Desativar
                                </Button>
                            )
                            : (
                                <Button
                                    size="small"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<FaCheck size={18} />}
                                    className={classes.buttonSuccess}
                                    onClick={() => {
                                        hamdleDesacticeActiveUser(user.id);
                                    }}
                                >
                                    Ativar
                                </Button>
                            ))
                        : (
                            <></>
                        )
                    }
                </div>
            </form>
        </Grid>
    );
}

export default UsuarioAddEdit;