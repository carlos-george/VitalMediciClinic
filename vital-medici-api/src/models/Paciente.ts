import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "./Consulta";
import { Endereco } from "./Endereco";

@Entity('pacientes')
class Paciente {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    documento: string;

    @Column({ type: 'date' })
    datanascimento: Date;

    @Column()
    telContato: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(type => Consulta, consulta => consulta.paciente)
    consultas: Consulta[];

    @OneToOne(() => Endereco, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco;
}

export { Paciente };
