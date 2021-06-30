import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { MedicoEspecialidade } from "./MedicoEspecialidade";

@Entity('medicos')
class Medico {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    nome: string;

    @Column()
    crm: string;

    @CreateDateColumn({ type: 'date' })
    telContato: Date;

    @Column()
    dataNascimento: string;

    @Column()
    isactive: boolean;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(type => MedicoEspecialidade, medEsp => medEsp.medico, { cascade: ['insert', 'update'] })
    medicosEspecialidades: MedicoEspecialidade[];

    constructor() {
        if (!this.isactive) {
            this.isactive = true;
        }
    }
}

export { Medico };
