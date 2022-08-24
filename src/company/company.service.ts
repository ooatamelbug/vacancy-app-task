import { GetCompanyDTO, CreateCompanyDTO } from "./dto/company.dto";
import { CompanyRepository } from "./company.repository";

export class CompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async findCompany(findData: GetCompanyDTO) {
    return await this.companyRepository.getOne(findData);
  }

  async findAllCompany(findData: GetCompanyDTO) {
    return await this.companyRepository.getAll(findData);
  }

  async createCompany(createdata: CreateCompanyDTO) {
    try {
      const user = await this.findCompany({ email: createdata.email });
      if (user !== null) {
        throw new Error("this user is exist with this email");
      }

      return await this.companyRepository.create(createdata);
    } catch (error) {
      throw error;
    }
  }
}
