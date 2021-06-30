import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('especialidades')
class Especialidade {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    descricao: string;

}

export { Especialidade };
