import { CreateUserDTO } from "./../users/dto/user.dto";
import { validate } from "class-validator";
import {GetVacancyDTO, CreateVacancyDTO, ApplyDTO} from "./dto/vacancy.dto";

class ErrorValidateVacancyDTO {
  public createVacancyDTO: CreateVacancyDTO;
  public getVacancyDTO: GetVacancyDTO
  public applyDTO: ApplyDTO;

  constructor() {
    this.createVacancyDTO = new CreateVacancyDTO();
    this.getVacancyDTO = new GetVacancyDTO();
    this.applyDTO = new ApplyDTO();
  }

  async validateCreateVacancy(createdata: CreateVacancyDTO) {
    this.createVacancyDTO.postionTitle = createdata.postionTitle;
    this.createVacancyDTO.description = createdata.description;
    this.createVacancyDTO.company = createdata.company;
    this.createVacancyDTO.requiredOfYearsExperience = createdata.requiredOfYearsExperience;
    this.createVacancyDTO.status = createdata.status;
    const errors = await validate(this.createVacancyDTO);
    if (errors.length) {
      const error = errors.map((err) => {
        return err.constraints;
      });
      return error;
    }
  }

  async validateGetVacancy(logdata: GetVacancyDTO) {
    this.getVacancyDTO.status = logdata.status;
    this.getVacancyDTO.requiredOfYearsExperience = logdata.requiredOfYearsExperience;
    const errors = await validate(this.getVacancyDTO);
    if (errors.length) {
      const error = errors.map((err) => {
        return err.constraints;
      });
      return error;
    }
  }
  
  async validateApplyVacancy(applydata: ApplyDTO) {
    this.applyDTO.email = applydata.email;
    this.applyDTO.vacancyId = applydata.vacancyId;
    const errors = await validate(this.applyDTO);
    if (errors.length) {
      const error = errors.map((err) => {
        return err.constraints;
      });
      return error;
    }
  }
}

export default ErrorValidateVacancyDTO;
