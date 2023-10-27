import { NextFunction, Request, Response } from "express";
import { Controller } from "../../../shared/contracts/controller";
import { TaskRepository } from "../../../domain/repositories/task_repository";
import { ParamsDictionary } from "express-serve-static-core";

interface ListAllTasksQueryString {
    done?: boolean;
    orderBy?: string;
}

class ListAllTasksController implements Controller<Request, Response, NextFunction> {

    private repository: TaskRepository;

    constructor(repository: TaskRepository) {
        this.repository = repository;
    }
    async handle(req: Request<ParamsDictionary, any, any, ListAllTasksQueryString, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {

        const { done, orderBy } = req.query;
        console.log(`Controller: ${done} ${orderBy}`)
        const tasks = await this.repository.findAll(orderBy, done);
        return res.status(200).json(tasks);
    }
}

export { ListAllTasksController };