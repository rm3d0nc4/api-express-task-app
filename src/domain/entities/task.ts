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

    constructor(name: string, description: string, isDone: boolean = false) {
        this.name = name
        this.description = description
        this.isDone = isDone
    }
}