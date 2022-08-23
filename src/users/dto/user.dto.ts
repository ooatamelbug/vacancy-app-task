import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ObjectID } from "typeorm";

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
    id?: ObjectID;
}

export class CredentialDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}