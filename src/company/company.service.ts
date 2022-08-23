import {GetCompanyDTO, CreateCompanyDTO} from "./dto/company.dto";
import { CompanyRepository } from "./company.repository";

export class CompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async findUser(findData: GetCompanyDTO) {
    return await this.companyRepository.getOne(findData);
  }

  async createUser(createdata: CreateCompanyDTO) {
    try {
      const user = await this.findUser({ email: createdata.email });
      if (user !== null) {
        throw new Error("this user is exist with this email");
      }

      return await this.companyRepository.create(createdata);
    } catch (error) {
      throw error;
    }
  }
}
