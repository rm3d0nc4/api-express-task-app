import express from "express";
import 'reflect-metadata'
import { taskRoutes } from "./presentation/routes/task_routes";

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    return res.json({ message: "Hello World" });
})

app.use('/api', taskRoutes)

const port = 3333;
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));