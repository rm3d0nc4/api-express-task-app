import exp from "constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Profile {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    avatarUrl: string;
    @Column()
    city: string;

    constructor(name: string, email: string, avatarUrl: string, city: string) {
        this.name = name
        this.email = email
        this.avatarUrl = avatarUrl
        this.city = city
    }
}

export { Profile };