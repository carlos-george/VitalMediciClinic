import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('status')
class Status {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descricao: string;

}
export { Status }