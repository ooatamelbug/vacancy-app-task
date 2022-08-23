import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCompanyDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}

export class GetCompanyDTO {
    @IsOptional()
    email?: string;
}
