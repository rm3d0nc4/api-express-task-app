import { Router, Request } from "express";
import { TaskRepositoryWithTypeORM } from "../../persistence/typeorm/task_repository_with_type_orm";
import { FindTaskByIdController } from "../controllers/TaskController/find_task_by_id_controller";
import { ListAllTasksController } from "../controllers/TaskController/list_all_tasks_controller";
import { SaveTaskController } from "../controllers/TaskController/save_task_controller";
import { DeleteTaskController } from "../controllers/TaskController/delete_task_controller";

interface ListAllTasksQueryString {
    done?: boolean;
    orderBy?: string;
}

const taskRoutes = Router();

const taskRepository = new TaskRepositoryWithTypeORM();
const listAllTasksController = new ListAllTasksController(taskRepository);
const saveTaskController = new SaveTaskController(taskRepository);
const findTaskByIdController = new FindTaskByIdController(taskRepository);
const deleteTaskController = new DeleteTaskController(taskRepository);

taskRoutes.get("/tasks", async (req: Request<{}, any, any, ListAllTasksQueryString, Record<string, any>>, res) => {

    const { done, orderBy } = req.query;
    console.log(`Controller: ${done} ${orderBy}`)
    // console.log(`Controller: ${this.repository}`)
    const tasks = await taskRepository.findAll(orderBy, done);
    return res.status(200).json(tasks);
});
taskRoutes.post("/tasks", saveTaskController.handle);
taskRoutes.get("/tasks/:id", findTaskByIdController.handle);
taskRoutes.delete("/tasks/:id", deleteTaskController.handle);

export { taskRoutes };