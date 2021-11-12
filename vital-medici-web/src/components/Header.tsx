// @flow 

import { useState } from "react";
import {
    AppBar,
    Button,
    createStyles,
    Grid,
    IconButton,
    ListItemIcon,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import { FaHome, FaUser, FaUserEdit } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useHistory } from "react-router";
import useAuth from "../hooks/useAuth";
import { Permission } from "./Permission";

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginRight: theme.spacing(3),
        },
        profileItems: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    })
);

export const Header = () => {

    const classes = useStyle();

    const { loggedUser, authenticated, handleLogout } = useAuth();

    const [anchorPacienteEl, setAnchorPacienteEl] = useState<null | HTMLElement>(null);
    const [anchorUserEl, setAnchorUserEl] = useState<null | HTMLElement>(null);
    const [anchorConfigEl, setAnchorConfigEl] = useState<null | HTMLElement>(null);

    const history = useHistory();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="home"
                    onClick={() => { history.push('/') }}
                    className={classes.button}
                >
                    <FaHome size={40} color="#fff" />
                </IconButton>
                <Grid item xs={12}>
                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="false"
                        color="secondary"
                        className={classes.button}
                        onClick={() => {
                            setAnchorPacienteEl(null);
                            history.push('agenda')
                        }}
                    >
                        Agenda
                    </Button>
                    <Permission roles={['ROLE_ADMIN']}>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => { setAnchorPacienteEl(event.currentTarget) }}
                            color="secondary"
                            className={classes.button}
                            name="paciente"
                        >
                            Paciente
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorPacienteEl}
                            keepMounted
                            open={Boolean(anchorPacienteEl)}
                            onClose={() => { setAnchorPacienteEl(null) }}
                            elevation={0}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem onClick={() => { setAnchorPacienteEl(null) }}>Profile</MenuItem>
                            <MenuItem onClick={() => { setAnchorPacienteEl(null) }}>My account</MenuItem>
                            <MenuItem onClick={() => { setAnchorPacienteEl(null) }}>Logout</MenuItem>
                        </Menu>
                    </Permission>
                    <Permission roles={['ROLE_ADMIN']}>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="false"
                            color="secondary"
                            className={classes.button}
                            onClick={(event) => { setAnchorConfigEl(event.currentTarget) }}
                            name="config"
                        >
                            Configurações
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorConfigEl}
                            keepMounted
                            open={Boolean(anchorConfigEl)}
                            onClose={() => { setAnchorConfigEl(null) }}
                            elevation={0}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem onClick={(event) => {
                                setAnchorConfigEl(null);
                                history.push('usuarios');
                            }}
                            >
                                Usuários
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorConfigEl(null);
                            }}>Médicos</MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorConfigEl(null);
                            }}>Especialidades</MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorConfigEl(null);
                            }}>Tipo Consulta</MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorConfigEl(null);
                            }}>Status</MenuItem>
                        </Menu>
                    </Permission>
                </Grid>
                {authenticated && (
                    <Grid item className={classes.profileItems}>
                        <Typography variant="h5" style={{ marginRight: '10px', fontWeight: 600, color: '#fff' }}>{loggedUser.username}</Typography>
                        <Typography variant="h5" style={{ fontWeight: 600, color: '#fff' }}>|</Typography>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(event) => { setAnchorUserEl(event.currentTarget) }}
                            color="inherit"
                            name="user"
                        >
                            <FaUser size={30} color="#fff" />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorUserEl}
                            keepMounted
                            open={Boolean(anchorUserEl)}
                            onClose={() => {
                                setAnchorUserEl(null);
                            }}
                            elevation={0}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <FaUserEdit size={20} />
                                </ListItemIcon>
                                <Typography variant="inherit">Perfil</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <FiLogOut size={20} />
                                </ListItemIcon>
                                <Typography variant="inherit">Sair</Typography>
                            </MenuItem>
                        </Menu>
                    </Grid>
                )}
            </Toolbar>
        </AppBar>
    );
};