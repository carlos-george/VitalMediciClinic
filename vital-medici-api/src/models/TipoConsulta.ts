import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipos_consultas')
class TipoConsulta {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descricao: string;
}

export { TipoConsulta }