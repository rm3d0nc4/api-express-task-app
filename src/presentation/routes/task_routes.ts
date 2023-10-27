import { ParamsDictionary } from 'express-serve-static-core';
import { Router, Request, NextFunction } from "express";
import { TaskRepositoryWithTypeORM } from "../../persistence/typeorm/repositories/task_repository_with_type_orm";
import { Task } from '../../domain/entities/task';
import { errorHandler } from '../../shared/handlers/error_handler';
import { AppError } from '../../shared/contracts/app_error';
import { ListAllTasksQueryString } from './request_interface/list_all_task_query_string';
import { SaveTaskBody } from './request_interface/save_task_body';

const taskRoutes = Router();
const taskRepository = new TaskRepositoryWithTypeORM();

taskRoutes.get("/tasks", async (req: Request<{}, any, any, ListAllTasksQueryString>, res, next) => {
    try {
        const { done, orderBy } = req.query;

        const tasks = await taskRepository.findAll(orderBy, done);
        return res.status(200).json(tasks);
    } catch (error) {
        next(error)
    }

});

taskRoutes.post("/tasks", async (req: Request<SaveTaskBody, any, SaveTaskBody>, res, next) => {
    console.log(req.body)

    try {
        const { name, description, isDone } = req.body;
        if (!name || !description) {
            throw new AppError("Incorrect body structure {name, description}", 400)
        }
        const task = new Task(name, description, isDone);
        await taskRepository.save(task);
        return res.status(201).json({ id: task.id });

    } catch (error) {
        next(error)
    }

})

taskRoutes.get("/tasks/:id", async (req: Request<ParamsDictionary>, res, next) => {
    try {
        const { id } = req.params;

        const task = await taskRepository.findById(id);
        return res.status(200).json(task);
    } catch (error) {
        next(error)
    }
});

taskRoutes.delete("/tasks/:id", async (req: Request<ParamsDictionary>, res, next) => {
    try {
        const { id } = req.params;

        const task = await taskRepository.findById(id);
        return res.status(204).json(task);
    } catch (error) {
        next(error)
    }
});
taskRoutes.use(errorHandler)

export { taskRoutes };