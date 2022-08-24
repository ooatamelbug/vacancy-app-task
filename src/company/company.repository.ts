import ConnectDB from "../database/db.config";
import { GetCompanyDTO, CreateCompanyDTO } from "./dto/company.dto";
import Company from "./entity/company";

export class CompanyRepository {
  private connection;

  constructor() {
    this.connection = ConnectDB;
  }

  async create(paramData: CreateCompanyDTO): Promise<Company> {
    const company = await this.connection
      .getRepository(Company)
      .create(paramData);
    return await this.connection.getRepository(Company).save(company);
  }

  async getOne(paramData: GetCompanyDTO): Promise<Company> {
    return await this.connection.getRepository(Company).findOne(paramData, {
      relations: ["userBy"],
    });
  }

  async getAll(paramData?: GetCompanyDTO): Promise<Company> {
    return await this.connection.getRepository(Company).find(paramData, {
      relations: ["userBy"],
    });
  }

  async update(paramData, companyId): Promise<Company> {
    const company = await this.connection
      .getRepository(Company)
      .findOneBy({ id: companyId });

    this.connection.getRepository(Company).merge(company, paramData);
    return await this.connection.getRepository(Company).save(company);
  }
}
