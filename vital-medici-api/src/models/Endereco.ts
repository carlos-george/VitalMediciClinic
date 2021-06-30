import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('enderecos')
class Endereco {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cep: string;

    @Column()
    logradouro: string;

    @Column()
    numero: string;

    @Column()
    complemento: string;

    @CreateDateColumn()
    created_at: Date;

}

export { Endereco }