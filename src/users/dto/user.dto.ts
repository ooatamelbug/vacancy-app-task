import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

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
}

export class CredentialDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}