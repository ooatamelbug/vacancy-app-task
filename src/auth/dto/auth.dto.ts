import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;
}

export class LoginresponseDTO {
    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    userId: string;
}