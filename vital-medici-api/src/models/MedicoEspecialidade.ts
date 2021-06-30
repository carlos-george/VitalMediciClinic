import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Agenda } from "./Agenda";
import { Especialidade } from "./Especialidade";
import { Medico } from "./Medico";

@Entity('medicos_especialidades')
class MedicoEspecialidade {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    valor: number;

    @Column()
    medico_id: string;

    @Column()
    especialidade_id: string;

    @ManyToOne(() => Medico)
    @JoinColumn({ name: 'medico_id' })
    medico: Medico;

    @ManyToOne(() => Especialidade)
    @JoinColumn({ name: 'especialidade_id' })
    especialidade: Especialidade;

    @OneToMany(type => Agenda, medEsp => medEsp.medicoEspecialidade)
    agendas: Agenda[];
}

export { MedicoEspecialidade }