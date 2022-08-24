import { User } from '../../users/entity/user';
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ObjectID } from "typeorm";
import Company from "../../company/entity/company";

export class CreateVacancyDTO {
  @IsNotEmpty()
  postionTitle: string;

  @IsNotEmpty()
  requiredOfYearsExperience: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  company: Company;
}

export class MergeCreateWithUuidDTO extends CreateVacancyDTO {
    uuid: string;
}

export class GetVacancyDTO {
  @IsOptional()
  status?: string;

  @IsOptional()
  requiredOfYearsExperience?: number;

  @IsOptional()
  uuid?: string | any;

  @IsOptional()
  created_by?: ObjectID

  @IsOptional()
  jobApplicants?: ObjectID
}

export class ApplyDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  vacancyId: string;
}
