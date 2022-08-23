import ConnectDB from "../database/db.config";
import {CreateUserDTO, GetUserDTO} from "./dto/user.dto";
import User from "./entity/user";

export class UserRepository {
    private connection;
    
    constructor() {
        this.connection = ConnectDB;
    }

    async create(paramData: CreateUserDTO): Promise<User> {
        const user = await this.connection.getRepository(User).create(paramData);
        return await this.connection.getRepository(User).save(user);
    }

    async getOne(paramData: GetUserDTO): Promise<User> {
        return await this.connection.getRepository(User).findOneBy(paramData);
    }
}