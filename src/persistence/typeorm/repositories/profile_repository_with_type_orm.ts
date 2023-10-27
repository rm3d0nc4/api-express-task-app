import { Profile } from "../../../domain/entities/profile";
import { ProfileRepository } from "../../../domain/repositories/profile_repository";
import { appDatasource } from "../../../infrastructure/datasources/app_datasource";
import { AppError } from "../../../shared/contracts/app_error";

class ProfileRepositoryWithTypeORM implements ProfileRepository {
    private repository = appDatasource.getRepository(Profile);;

    async findAll(): Promise<Profile[]> {
        const profiles = await this.repository.find();
        return profiles;
    }
    async findById(id: string): Promise<Profile> {
        const profile = await this.repository.findOneBy({ id: id });
        if (profile == null) { throw new AppError("Profile not found", 404) }
        return profile!;
    }
    async save(profile: Profile): Promise<void> {
        await this.repository.save(profile);
    }
    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.repository.delete({ id: id });
    }

}