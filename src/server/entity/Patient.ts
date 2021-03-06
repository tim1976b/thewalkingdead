import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Patient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    information: string;

    @Column()
    painLevelId: number;

    @Column()
    selectedIlnessId: number;

}
