import ConnectDB from "../database/db.config";
import {GetCompanyDTO, CreateCompanyDTO} from "./dto/company.dto";
import Company from "./entity/company";

export class CompanyRepository {
    private connection;
    
    constructor() {
        this.connection = ConnectDB;
    }

    async create(paramData: CreateCompanyDTO): Promise<Company> {
        const company = await this.connection.getRepository(Company).create(paramData);
        return await this.connection.getRepository(Company).save(company);
    }

    async getOne(paramData: GetCompanyDTO): Promise<Company> {
        return await this.connection.getRepository(Company).findOneBy(paramData);
    }
}