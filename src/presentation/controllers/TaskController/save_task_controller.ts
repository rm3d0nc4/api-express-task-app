import { NextFunction, Request, Response } from "express";
import { Controller } from "../../../shared/contracts/controller";
import { TaskRepository } from "../../../shared/contracts/task_repository";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Task } from "../../../domain/entities/task";

class SaveTaskController implements Controller<Request, Response, NextFunction> {
    private repository: TaskRepository;

    constructor(repository: TaskRepository) {
        this.repository = repository;
    }
    
    async handle(req: Request<ParamsDictionary, any, Task, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const task = req.body;
        await this.repository.save(task);
        return res.status(201).json({id: task.id});
    }
}

export { SaveTaskController };