import { DataSource } from "typeorm";
import { Task } from "../../domain/entities/task";
import { configDotenv } from "dotenv";


configDotenv();

export const appDatasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Task
    ],
    subscribers: [],
    migrations: [
        "src/persistence/typeorm/migrations/*.{ts, js}"
    ],

});


appDatasource.initialize().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log("Error connecting to database");
    console.log(err);
})