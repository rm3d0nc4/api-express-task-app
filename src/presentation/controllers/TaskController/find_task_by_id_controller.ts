import { NextFunction, Request, Response } from "express";
import { Controller } from "../../../shared/contracts/controller";
import { TaskRepository } from "../../../shared/contracts/task_repository";
import { ParamsDictionary } from "express-serve-static-core";

class FindTaskByIdController implements Controller<Request, Response, NextFunction> {

    private repository: TaskRepository;

    constructor(repository: TaskRepository) {
        this.repository = repository;
    }
    async handle(req: Request<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const {id} = req.params;

        const task = await this.repository.findById(id);
        return res.status(200).json(task);
    }
}

export { FindTaskByIdController };