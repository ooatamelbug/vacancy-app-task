import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ObjectID } from "typeorm";
import { JobDay } from "../../users/entity/user";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firsname: string;

  @IsNotEmpty()
  lastname: string;
}

export class GetUserDTO {
  @IsOptional()
  email?: string;
  id?: any;
}

export class CredentialDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  firsname?: string;

  @IsOptional()
  lastname?: string;

  @IsOptional()
  id?: ObjectID;

  @IsOptional()
  jobInDay?: [JobDay];
}
