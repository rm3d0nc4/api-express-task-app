import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

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
    @ManyToOne(() => User, user => user.tasks)
    user: User;

    constructor(name: string, description: string, isDone: boolean = false, user: User) {
        this.name = name
        this.description = description
        this.isDone = isDone
        this.user = user
    }
}