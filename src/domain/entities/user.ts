import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile";
import { Task } from "./task";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    userName: string;
    @Column()
    password: string;

    @OneToOne(() => Profile, { eager: true, cascade: true })
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Task, task => task.user, {cascade: true})
    @JoinColumn()
    tasks: Promise<Task[]>;

    constructor(userName: string, password: string, profile: Profile, tasks: Promise<Task[]> = Promise.resolve([])) {
        this.userName = userName
        this.password = password
        this.profile = profile
        this.tasks = tasks
    }
}

export { User };