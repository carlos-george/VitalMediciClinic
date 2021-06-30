import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Role } from "./Role";

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @CreateDateColumn({ type: 'date' })
    datebirth: Date;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    isactive: boolean;

    @Column()
    issystemadmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    constructor() {
        // if (!this.id) {
        //     this.id = uuid();
        // }
        if (!this.isactive) {
            this.isactive = true;
        }
        this.issystemadmin = false;
    }
}

export { User };
