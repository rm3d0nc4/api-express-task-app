import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user_repository";
import { appDatasource } from "../../../infrastructure/datasources/app_datasource";
import { AppError } from "../../../shared/contracts/app_error";

class UserRepositoryWithTypeORM implements UserRepository {
    private repository = appDatasource.getRepository(User);;

    async findAll(): Promise<User[]> {
        const users = await this.repository.find();
        return users;
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({ id: id });
        if (user == null) { throw new AppError("User not found", 404) }
        return user!;
    }
    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }
    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.repository.delete({ id: id });
    }
}