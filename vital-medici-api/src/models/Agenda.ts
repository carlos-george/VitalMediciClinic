import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicoEspecialidade } from "./MedicoEspecialidade";
import { Status } from "./Status";
import { TipoConsulta } from "./TipoConsulta";

@Entity('agendas')
class Agenda {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hora: number;

    @Column({ type: 'date' })
    day: Date;

    @Column()
    nomePaciente: string;

    @Column()
    nomeAcompanhante: string;

    @Column()
    telContatoPaciente: string;

    @Column()
    medEspDesc: string;

    // @Column()
    // medico_especialidade_id: string;

    // @Column()
    // status_id: string;

    // @Column()
    // tipoConsulta_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => MedicoEspecialidade)
    @JoinColumn({ name: 'medico_especialidade_id' })
    medicoEspecialidade: MedicoEspecialidade;

    @OneToOne(() => Status)
    @JoinColumn({ name: 'status_id' })
    status: Status;

    @OneToOne(() => TipoConsulta)
    @JoinColumn({ name: 'tipoConsulta_id' })
    tipoConsulta: TipoConsulta;

}

export { Agenda }