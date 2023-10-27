import { NextFunction, Request, Response } from "express";
import { Controller } from "../../../shared/contracts/controller";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { TaskRepository } from "../../../domain/repositories/task_repository";


class DeleteTaskController implements Controller<Request, Response, NextFunction> {
    repository: TaskRepository;

    constructor(repository: TaskRepository) {
        this.repository = repository;
    }

    async handle(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const { id } = req.params;
        await this.repository.delete(id);
        return res.status(204).send();
    }

}

export { DeleteTaskController };