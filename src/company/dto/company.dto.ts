import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ObjectID } from "typeorm";

export class CreateCompanyDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    userBy: any;
}

export class GetCompanyDTO {
    @IsOptional()
    email?: string;

    @IsOptional()
    userBy?: ObjectID;
}
