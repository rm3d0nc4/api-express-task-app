import express from "express";
import 'reflect-metadata'

const app = express()

app.get("/", (req, res) => {
    return res.json({ message: "Hello World" });
})

app.listen(3333, () => console.log("Server is running on port http://localhost:3333"));