import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
// import User from "users/entity/user";

export class CreateCompanyDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    user: any;
}

export class GetCompanyDTO {
    @IsOptional()
    email?: string;
}
