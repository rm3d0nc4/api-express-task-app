import e from "express";
import { User } from "../entities/user";

interface UserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    save(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}

export { UserRepository };