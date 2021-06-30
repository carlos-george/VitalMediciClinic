import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
class Role {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    // constructor() {
    //     if (!this.id) {
    //         this.id = uuid();
    //     }
    // }
}

export { Role };
