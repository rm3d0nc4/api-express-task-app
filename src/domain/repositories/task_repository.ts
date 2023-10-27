import { Task } from "../entities/task";

interface TaskRepository {
    findAll(orderBy?: string, done?: boolean): Promise<Task[]>;
    findById(id: string): Promise<Task>;
    save(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}

export { TaskRepository };