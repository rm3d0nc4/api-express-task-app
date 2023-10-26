import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    isDone: boolean;
}