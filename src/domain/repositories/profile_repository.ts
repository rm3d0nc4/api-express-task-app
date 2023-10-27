import exp from "constants";
import { Profile } from "../entities/profile";

interface ProfileRepository {
    findAll(): Promise<Profile[]>;
    findById(id: string): Promise<Profile>;
    save(profile: Profile): Promise<void>;
    delete(id: string): Promise<void>;
}

export { ProfileRepository };