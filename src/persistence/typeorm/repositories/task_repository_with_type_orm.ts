import { appDatasource } from '../../../infrastructure/datasources/app_datasource';
import { TaskRepository } from '../../../domain/repositories/task_repository';
import { Task } from '../../../domain/entities/task';
import { AppError } from '../../../shared/contracts/app_error';

class TaskRepositoryWithTypeORM implements TaskRepository {
    private repository = appDatasource.getRepository(Task);;

    async findAll(orderBy?: string, done?: boolean): Promise<Task[]> {
        console.log(`Repository: ${done} ${orderBy}`)
        const tasks = await this.repository.find({ where: { isDone: done }, order: orderBy ? { [orderBy]: "ASC" } : undefined });

        return tasks;
    }

    async findById(id: string): Promise<Task> {
        const task = await this.repository.findOneBy({ id: id });
        if (task == null) { throw new AppError("Task not found", 404) }
        return task!;
    }

    async save(task: Task): Promise<void> {
        await this.repository.save(task);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.repository.delete({ id: id });
    }
}

export { TaskRepositoryWithTypeORM };