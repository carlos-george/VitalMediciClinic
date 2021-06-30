import {
    Button,
    Container,
    createStyles,
    Grid,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    TextField,
    Theme,
    Typography
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
    FaUser,
    FaUserPlus,
    FaUserEdit,
    FaTimes,
    FaSearch,
    FaCheck
} from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useSnackbar } from 'notistack';

import api from '../services/api';
import { PageContent } from '../components/PageContent';
import UsuarioShow from '../components/usuario/UsuarioShow';
import UsuarioAddEdit from '../components/usuario/UsuarioAddEdit';
import { ResetPassword } from '../components/usuario/ResetPassword';
import { Permission } from '../components/Permission';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '20px',
        },
        gridFilter: {
            width: '100%'
        },
        gridItemHeader: {
            background: theme.palette.primary.light,
            padding: '10px',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: 600,
            letterSpacing: '2px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        listItems: {
            maxWidth: '100%',
            padding: '10px',
        },
        adornmentImg: {
            color: theme.palette.primary.main
        },
        margin: {
            margin: theme.spacing(1),
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
    role_id: string;
    datebirth: string;
}

export const Usuário = () => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [userNameFilter, setUserNameFilter] = useState('');
    const [userList, setUserList] = useState<UsuarioFields[]>([]);
    const [selectedUser, setSelectedUser] = useState<UsuarioFields>({} as UsuarioFields);
    const [isUserToShow, setIsUserToShow] = useState(false);
    const [isUserAddOrEdit, setIsUserAddOrEdit] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [reloadListUsers, setReloadListUsers] = useState(false);

    useEffect(() => {

        const filter = userNameFilter.trim().length !== null
            && userNameFilter.length >= 3
            ? userNameFilter
            : '';

        api.get(`/users?username=${filter}`).then((response) => {
            const { users } = response.data;
            const result = users.map((user: UsuarioFields) => {
                const formatedDate = format(parseISO(user.datebirth), 'yyyy-MM-d', { locale: ptBR });
                const data = {
                    ...user,
                    datebirth: formatedDate,
                };
                return data;
            });
            setReloadListUsers(false);
            setUserList(result);
        });

    }, [userNameFilter, reloadListUsers]);

    function handleSubmitAddEdit(user: UsuarioFields) {
        // console.log('Usuário edited: ', user);
        if (!user.id || user.id === '') {

            api.post('/users', user).then((response) => {
                const { user } = response.data;

                setIsUserToShow(false);
                setIsUserAddOrEdit(false);
                setSelectedUser({} as UsuarioFields);
                setReloadListUsers(true);
                enqueueSnackbar(`${user.firstname} ${user.lastname} cadastrado com sucesso!`, {
                    variant: 'success',
                });
            });
        } else {
            api.put('/users', user).then((response) => {
                const { user } = response.data;
                setIsUserToShow(false);
                setIsUserAddOrEdit(false);
                setSelectedUser({} as UsuarioFields);
                setReloadListUsers(true);
                enqueueSnackbar(`${user.firstname} ${user.lastname} atualizado com sucesso!`, {
                    variant: 'success',
                });
            });

        }
    }

    function handleEditUser() {
        setIsUserAddOrEdit(true);
        setIsUserToShow(false);
        setIsResetPassword(false);
    }

    function handleResetPassword() {
        setIsUserAddOrEdit(false);
        setIsUserToShow(false);
        setIsResetPassword(true);
    }

    function handleSubmitResetPassword() {
        setIsUserAddOrEdit(false);
        setIsUserToShow(false);
        setIsResetPassword(false);
    }

    function hamdleDesacticeActiveUser(id: string) {

        api.put(`/users-active-desactive/${id}`).then((response) => {

            const { user } = response.data;
            setReloadListUsers(true);
            handleSubmitResetPassword();
            enqueueSnackbar(`Usuário ${user.isactive ? 'ativado' : 'desativado'} com sucesso!`, {
                variant: 'success',
            });
        })
    }

    return (
        <PageContent>
            <Container className={classes.root} maxWidth="lg">
                <Grid item xs={4}>
                    <TextField
                        className={classes.margin}
                        label="Procurar por nome usuário"
                        fullWidth
                        autoComplete="off"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Usuário"
                        variant="outlined"
                        value={userNameFilter}
                        onChange={(event) => { setUserNameFilter(event.target.value) }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FaSearch size={20} className={classes.adornmentImg} />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid container spacing={5} direction="row">
                    <Grid item xs={6}>
                        <Grid item className={classes.gridItemHeader}>
                            <Typography variant="h4">Usuários</Typography>
                            <Permission roles={['ROLE_ADMIN']}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<FaUserPlus size={18} />}
                                    onClick={() => {
                                        setIsUserAddOrEdit(true);
                                        setIsUserToShow(false);
                                        setIsResetPassword(false);
                                        setSelectedUser({} as UsuarioFields);
                                    }}
                                >
                                    Adicionar
                            </Button>
                            </Permission>
                        </Grid>
                        <List dense className={classes.listItems}>
                            {userList.map((user, index) => (
                                <ListItem
                                    key={user.id}
                                    button
                                    selected={user.id === selectedUser.id}
                                    onClick={() => {
                                        setIsUserAddOrEdit(false);
                                        setIsUserToShow(true);
                                        setIsResetPassword(false);
                                        setSelectedUser(user);
                                    }}>
                                    <ListItemAvatar>
                                        <FaUser size={30} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        id={user.id}
                                        primary={`${user.firstname} ${user.lastname}`}
                                        secondary={user.username}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            color="secondary"
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setIsUserToShow(false);
                                                setIsUserAddOrEdit(true)
                                                setIsResetPassword(false);
                                            }}>
                                            <FaUserEdit size={20} />
                                        </IconButton>
                                        <Permission roles={['ROLE_ADMIN']}>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                style={{ marginLeft: '2px' }}
                                                onClick={() => {
                                                    hamdleDesacticeActiveUser(user.id);
                                                }}
                                            >
                                                {user.isactive
                                                    ? (

                                                        <FaTimes size={18} color="#ff4f5b" />
                                                    )
                                                    : (
                                                        <FaCheck size={18} color="#43da82" />

                                                    )
                                                }
                                            </IconButton>
                                        </Permission>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid item className={classes.gridItemHeader}>
                            <Typography variant="h4">Perfil</Typography>
                        </Grid>
                        {isUserToShow && (
                            <UsuarioShow
                                user={selectedUser}
                                handleEditUser={handleEditUser}
                                handleResetPassword={handleResetPassword}
                                hamdleDesacticeActiveUser={hamdleDesacticeActiveUser}
                            />
                        )
                        }
                        {isUserAddOrEdit && (
                            <UsuarioAddEdit
                                user={selectedUser}
                                handleSubmitEdit={handleSubmitAddEdit}
                                handleResetPassword={handleResetPassword}
                                hamdleDesacticeActiveUser={hamdleDesacticeActiveUser}
                            />
                        )
                        }
                        {isResetPassword && (
                            <ResetPassword
                                id={selectedUser.id}
                                handleSubmitResetPassword={handleSubmitResetPassword}
                            />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </PageContent>
    );
};