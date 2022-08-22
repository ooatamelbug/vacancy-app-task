export class CreateUserDTO {
    email: string;
    password: string;
    firsname: string;
    lastname: string;
}

export class GetUserDTO {
    email?: string;
}

export class CredentialDTO {
    email: string;
    password: string;
}