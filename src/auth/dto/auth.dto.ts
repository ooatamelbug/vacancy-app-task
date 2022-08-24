import { IsEmail, IsNotEmpty } from "class-validator";
import { ObjectID } from "typeorm";

export class SigninUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;
}

export class SigninResponseDTO {
    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    userId: ObjectID;
}