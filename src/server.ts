import express from "express";
import 'reflect-metadata'

const app = express()

app.get("/", (req, res) => {
    return res.json({ message: "Hello World" });
})

const port = 3333;

app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));