import {
    Container,
    Grid,
    makeStyles,
    Theme,
    createStyles,
    Typography,
    IconButton,
    TextField,
    MenuItem,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Modal
} from "@material-ui/core";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FaFilter, FaPlus, FaUser, FaSearch, FaUndo } from "react-icons/fa";
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import InputMask from 'react-input-mask';
import { useSnackbar } from 'notistack';

import api from '../services/api';
import { PageContent } from "../components/PageContent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '20px',
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
            marginBottom: '10px'
        },
        gridItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        gridListItem: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            borderRadius: '10px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: theme.palette.primary.dark,
            marginBottom: '5px',
        },
        margin: {
            margin: theme.spacing(1),
        },
        gridItemFilter: {
            color: '#ffffff',
        },
        listItems: {
            maxWidth: '100%',
            padding: '10px',
        },
        modal: {
            position: 'absolute',
            width: "300px",
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            borderRadius: '10px',
        },
        buttonReset: {
            background: '#3f50b5',
            '&:hover': {
                background: '#002884'
            }
        },
    })
);

type ConsultaStatus = {
    id: string,
    descricao: string
}

type TipoConsulta = {
    id: string,
    descricao: string
}

type AgendaFields = {
    id?: string
    day: string,
    hora: string,
    nomePaciente: string,
    telContatoPaciente: string,
    tipoConsulta_id: string,
    status_id: string,
    medico: string,
    especialidade: string,
    medEspDesc?: string,
    tipoConsulta?: TipoConsulta,
    status?: ConsultaStatus
}

type DateHourNow = {
    day: string,
    dayFormatedBr: string,
    hour: string
}

type FilterProps = {
    day: string,
    medico: string,
    nomePaciente: string,
    status_id: string,
    tipoConsulta_id: string
}

export const Agenda = () => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [dateHourNow, setDateHourNow] = useState<DateHourNow>(() => {

        const date = new Date();
        const day = format(date, 'yyyy-MM-d', { locale: ptBR });
        const dayFormatedBr = format(date, 'd/MM/yyyy', { locale: ptBR });
        const hour = format(date, 'HH:mm', { locale: ptBR });

        return { day, dayFormatedBr, hour };
    });

    const initialValues = {
        day: dateHourNow.day,
        hora: dateHourNow.hour,
        nomePaciente: "",
        telContatoPaciente: "",
        tipoConsulta_id: "",
        status_id: "",
        medico: "",
        especialidade: "",
    }

    const initialFilterValues = {
        day: dateHourNow.day,
        medico: "",
        nomePaciente: "",
        status_id: "",
        tipoConsulta_id: ""
    }

    const [values, setValues] = useState<AgendaFields>(initialValues);
    const [listaStatus, setListaStatus] = useState<ConsultaStatus[]>([]);
    const [listaTipoConsulta, setListaTipoConsulta] = useState<TipoConsulta[]>([]);
    const [consultas, setConsultas] = useState<AgendaFields[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [filterValues, setFilterValues] = useState<FilterProps>(initialFilterValues);

    useEffect(() => {
        api.get('/status-tipo-consulta').then((response) => {
            const { listaStatus, listaTipoConsulta } = response.data;

            setListaStatus(listaStatus);
            setListaTipoConsulta(listaTipoConsulta);
        });
    }, []);

    useEffect(() => {

        getConsultas();

    }, []);

    function getConsultas() {

        var filter = `day=${filterValues.day}`
        filter = filter.concat(`&nomePaciente=${filterValues.nomePaciente}`);
        filter = filter.concat(`&medico=${filterValues.medico}`);
        filter = filter.concat(`&status_id=${filterValues.status_id}`)
        filter = filter.concat(`&tipoConsulta_id=${filterValues.tipoConsulta_id}`);

        api.get(`/agendas-day?${filter}`).then((response) => {
            const { agenda } = response.data;

            setConsultas(agenda);

        }).catch((error) => {

            const { data } = error.response;
            if (data.error) {
                setConsultas([]);
                enqueueSnackbar(data.error, {
                    variant: 'error',
                });
            }
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        console.log("Data: ", values);
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {

        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    function handleOnChangeFilter(event: ChangeEvent<HTMLInputElement>) {

        setFilterValues({
            ...filterValues,
            [event.target.name]: event.target.value,
        })
    }

    function handleModalOpen() {
        setModalOpen(true);
    };

    function handleModalClose() {
        setModalOpen(false);
        getConsultas();

        const dayFormatedBr = format(parseISO(filterValues.day), 'd/MM/yyyy', { locale: ptBR });
        setDateHourNow(prevState => ({
            ...prevState,
            dayFormatedBr
        }));
    };

    return (
        <PageContent>
            <Container className={classes.root} maxWidth="lg">
                <Grid container spacing={5} direction="row">
                    <Grid item xs={6}>
                        <Grid item className={classes.gridItemHeader}>
                            <Typography variant="h4">Nova Consulta</Typography>
                        </Grid>
                        <form onSubmit={handleSubmit}>
                            <Grid item xs={12} className={classes.gridItem}>
                                <TextField
                                    className={classes.margin}
                                    label="Data da Consulta"
                                    fullWidth
                                    type="date"
                                    id="day"
                                    name="day"
                                    placeholder="Data de Consulta"
                                    variant="outlined"
                                    value={values.day || ''}
                                    onChange={handleOnChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <TextField
                                    className={classes.margin}
                                    label="Hora"
                                    fullWidth
                                    type="time"
                                    id="hora"
                                    name="hora"
                                    placeholder="Hora"
                                    variant="outlined"
                                    value={values.hora || ''}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                                <TextField
                                    className={classes.margin}
                                    label="Paciente"
                                    fullWidth
                                    type="text"
                                    id="nomePaciente"
                                    name="nomePaciente"
                                    placeholder="Nome Paciente"
                                    variant="outlined"
                                    value={values.nomePaciente || ''}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={6} className={classes.gridItem}>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={values.telContatoPaciente || ''}
                                    onChange={handleOnChange}
                                >
                                    {
                                        (inputProps: any) => <TextField
                                            {...inputProps}
                                            className={classes.margin}
                                            label="Telefone"
                                            fullWidth
                                            type="text"
                                            id="telContatoPaciente"
                                            name="telContatoPaciente"
                                            placeholder="Telefone Contato"
                                            variant="outlined"
                                        />
                                    }
                                </InputMask>
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                                <TextField
                                    className={classes.margin}
                                    label="Médico"
                                    fullWidth
                                    type="text"
                                    id="medico"
                                    name="medico"
                                    placeholder="Médico"
                                    variant="outlined"
                                    value={values.medico || ''}
                                    onChange={handleOnChange}
                                />

                                <TextField
                                    className={classes.margin}
                                    label="Especialidade"
                                    fullWidth
                                    type="text"
                                    id="especialidade"
                                    name="especialidade"
                                    placeholder="Especialidade"
                                    variant="outlined"
                                    value={values.especialidade || ''}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                                <TextField
                                    className={classes.margin}
                                    id="tipoConsulta"
                                    select
                                    fullWidth
                                    name="tipoConsulta"
                                    label="Tipo Consulta"
                                    placeholder="Tipo da Consulta"
                                    value={values.tipoConsulta_id || ''}
                                    onChange={(event) => {
                                        setValues({
                                            ...values,
                                            tipoConsulta_id: event.target.value + ''
                                        })
                                    }}
                                    variant="outlined"
                                >
                                    {listaTipoConsulta.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.descricao}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    className={classes.margin}
                                    id="status"
                                    select
                                    fullWidth
                                    name="status"
                                    label="Status"
                                    placeholder="Status"
                                    value={values.status_id || ''}
                                    onChange={(event) => {
                                        setValues({
                                            ...values,
                                            status_id: event.target.value + ''
                                        })
                                    }}
                                    variant="outlined"
                                >
                                    {listaStatus.map((status) => (
                                        <MenuItem key={status.id} value={status.id}>
                                            {status.descricao}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                                <Button
                                    type="submit"
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    startIcon={<FaPlus size={16} />}
                                >
                                    Gravar
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid item className={classes.gridItemHeader}>
                            <Typography variant="h4">{`Agenda - ${dateHourNow.dayFormatedBr}`}</Typography>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                className={classes.gridItemFilter}
                                onClick={handleModalOpen}
                            >
                                <FaFilter size={20} />
                            </IconButton>
                        </Grid>
                        <List dense className={classes.listItems}>
                            {consultas.map((consulta) => (
                                <ListItem key={consulta.id} className={classes.gridListItem}>
                                    <Grid item xs={12} className={classes.gridItem}>
                                        <ListItemAvatar>
                                            <FaUser size={30} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            id={consulta.id}
                                            primary={`${consulta.nomePaciente} - ${consulta.hora}`}
                                            secondary={`${consulta.status?.descricao} - ${consulta.tipoConsulta?.descricao}`}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.gridItem} >
                                        <ListItemText
                                            id={`${consulta.id} - 1`}
                                            primary={`${consulta.medEspDesc}`}
                                        />
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={modalOpen}
                    onClose={handleModalClose}
                >
                    <div style={{ top: "10%", left: "40%" }} className={classes.modal}>
                        <Grid item className={classes.gridItemHeader}>
                            <Typography variant="h6">Filtro</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                className={classes.margin}
                                label="Data da Consulta"
                                fullWidth
                                type="date"
                                id="filterDay"
                                name="day"
                                placeholder="Data de Consulta"
                                variant="outlined"
                                value={filterValues.day || ''}
                                onChange={handleOnChangeFilter}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                className={classes.margin}
                                label="Paciente"
                                fullWidth
                                type="text"
                                id="filterNomePaciente"
                                name="nomePaciente"
                                placeholder="Nome Paciente"
                                variant="outlined"
                                value={filterValues.nomePaciente || ''}
                                onChange={handleOnChangeFilter}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                className={classes.margin}
                                label="Médico"
                                fullWidth
                                type="text"
                                id="filterMedico"
                                name="medico"
                                placeholder="Médico"
                                variant="outlined"
                                value={filterValues.medico || ''}
                                onChange={handleOnChangeFilter}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                className={classes.margin}
                                id="filterTipoConsulta"
                                select
                                fullWidth
                                name="tipoConsulta"
                                label="Tipo Consulta"
                                placeholder="Tipo da Consulta"
                                value={filterValues.tipoConsulta_id || ''}
                                onChange={(event) => {
                                    setFilterValues({
                                        ...filterValues,
                                        tipoConsulta_id: event.target.value + ''
                                    })
                                }}
                                variant="outlined"
                            >
                                <MenuItem value="">
                                    Selecione...
                                </MenuItem>
                                {listaTipoConsulta.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.descricao}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                className={classes.margin}
                                id="filterStatus"
                                select
                                fullWidth
                                name="status"
                                label="Status"
                                placeholder="Status"
                                value={filterValues.status_id || ''}
                                onChange={(event) => {
                                    setFilterValues({
                                        ...filterValues,
                                        status_id: event.target.value + ''
                                    })
                                }}
                                variant="outlined"
                            >
                                <MenuItem value="">
                                    Selecione...
                                </MenuItem>
                                {listaStatus.map((status) => (
                                    <MenuItem key={status.id} value={status.id}>
                                        {status.descricao}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} className={[classes.gridItem, classes.margin].join(' ')}>
                            <Button
                                type="button"
                                size="small"
                                variant="contained"
                                color="secondary"
                                fullWidth
                                startIcon={<FaSearch size={16} />}
                                onClick={handleModalClose}
                                style={{ marginRight: '10px' }}
                            >
                                Filtrar
                            </Button>
                            <Button
                                type="button"
                                size="small"
                                variant="contained"
                                className={classes.buttonReset}
                                fullWidth
                                startIcon={<FaUndo size={16} />}
                                onClick={() => {
                                    setFilterValues(initialFilterValues)
                                }}
                            >
                                Limpar
                            </Button>
                        </Grid>
                    </div>
                </Modal>
            </Container>
        </PageContent>
    );

}