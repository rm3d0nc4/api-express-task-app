import { NextFunction, Request, Response } from "express";
import { AppError } from "../contracts/app_error";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error.message)

    if(error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(520).json({ message: error.message })
}