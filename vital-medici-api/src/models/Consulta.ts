import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicoEspecialidade } from "./MedicoEspecialidade";
import { Paciente } from "./Paciente";
import { Status } from "./Status";
import { TipoConsulta } from "./TipoConsulta";

@Entity('çonsultas')
class Consulta {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    anamnese: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => MedicoEspecialidade)
    @JoinColumn({ name: 'medico_especialidade_id' })
    medicoEspecialidade: MedicoEspecialidade;

    @ManyToOne(() => Paciente)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;

    @OneToOne(() => Status)
    @JoinColumn({ name: 'status_id' })
    status: Status;

    @OneToOne(() => TipoConsulta)
    @JoinColumn({ name: 'tipos_consultas_id' })
    tipoConsulta: TipoConsulta;
}

export { Consulta };
