import { CreateUserDTO } from "./../users/dto/user.dto";
import { validate } from "class-validator";
import { GetCompanyDTO, CreateCompanyDTO } from "./dto/company.dto";

class ErrorValidateCompanyDTO {
  public createCompanyDTO: CreateCompanyDTO;
  public getCompanyDTO: GetCompanyDTO

  constructor() {
    this.createCompanyDTO = new CreateCompanyDTO();
    this.getCompanyDTO = new GetCompanyDTO();
  }

  async validateCreateCompany(createdata: CreateCompanyDTO) {
    this.createCompanyDTO.email = createdata.email;
    this.createCompanyDTO.description = createdata.description;
    this.createCompanyDTO.name = createdata.name;
    const errors = await validate(this.createCompanyDTO);
    if (errors.length) {
      const error = errors.map((err) => {
        return err.constraints;
      });
      return error;
    }
  }

  async validateGetCompany(logdata: GetCompanyDTO) {
    this.getCompanyDTO.email = logdata.email;
    const errors = await validate(this.getCompanyDTO);
    if (errors.length) {
      const error = errors.map((err) => {
        return err.constraints;
      });
      return error;
    }
  }
}

export default ErrorValidateCompanyDTO;
