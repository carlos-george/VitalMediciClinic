import { Button, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { FaTimes, FaUserEdit, FaUndo, FaCheck } from "react-icons/fa";
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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
        }
    })
);

type UsuarioFields = {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    datebirth: string;
    isactive: boolean;
}

type UsuarioShowProps = {
    user: UsuarioFields;
    handleEditUser: () => void;
    handleResetPassword: () => void;
    hamdleDesacticeActiveUser: (id: string) => void;
}

const UsuarioShow: React.FC<UsuarioShowProps> = ({
    user,
    handleEditUser,
    handleResetPassword,
    hamdleDesacticeActiveUser
}) => {

    const classes = useStyles();

    return (
        <Grid container direction="column" style={{ padding: '20px' }}>
            <Typography variant="h6" style={{ fontWeight: 600 }}>
                Primeiro Nome:
                    <span className={classes.span}>{user.firstname}</span>
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 600 }}>
                Último Nome:
                    <span className={classes.span}>{user.lastname}</span>
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 600 }}>
                Data de Nascimento:
                    <span className={classes.span}>{format(parseISO(user.datebirth), 'd/MM/yyyy', { locale: ptBR })}</span>
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 600 }}>
                Usuário de Acesso:
                    <span className={classes.span}>{user.username}</span>
            </Typography>
            <div className={classes.buttons}>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<FaUserEdit size={18} />}
                    style={{ marginRight: '10px' }}
                    onClick={handleEditUser}
                >
                    Editar
                </Button>
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
                {user.isactive
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
                    )
                }
            </div>
        </Grid>
    );
}

export default UsuarioShow;