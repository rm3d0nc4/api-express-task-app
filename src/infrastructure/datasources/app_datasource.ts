import { DataSource } from "typeorm";
import { Task } from "../../domain/entities/task";
import { configDotenv } from "dotenv";
import { User } from "../../domain/entities/user";
import { Profile } from "../../domain/entities/profile";


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
        Task, User, Profile
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