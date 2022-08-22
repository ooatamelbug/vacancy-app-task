import ConnectDB from "../database/db.config";
import {CreateUserDTO, GetUserDTO} from "./dto/user.dto";
import User from "./entity/user";

export class UserRepository {
    private connection;
    
    constructor() {
        this.connection = ConnectDB;
    }

    async create(paramData: CreateUserDTO): Promise<User> {
        return await this.connection.manager.save(paramData);
    }

    async getOne(paramData: GetUserDTO): Promise<User> {
        return await this.connection.manager.findBy(User, paramData);
    }
}