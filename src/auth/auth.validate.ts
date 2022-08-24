import { CreateUserDTO } from "./../users/dto/user.dto";
import { validate } from "class-validator";
import { SigninUserDTO } from "./dto/auth.dto";

class ErrorValidateUserDTO {
  public createUserDTO: CreateUserDTO;
  public signinUserDTO: SigninUserDTO;

  constructor() {
    this.createUserDTO = new CreateUserDTO();
    this.signinUserDTO = new SigninUserDTO();
  }

  async validateCreateUser(createdata: CreateUserDTO) {
    this.createUserDTO.email = createdata.email;
    this.createUserDTO.password = createdata.password;
    this.createUserDTO.firsname = createdata.firsname;
    this.createUserDTO.lastname = createdata.lastname;
    const errors = await validate(this.createUserDTO);
    if (errors.length) {
      const error = errors.map((err) => {
        return err.constraints;
      });
      return error;
    }
  }

  async validateLoginUser(logdata: SigninUserDTO) {
    this.signinUserDTO.email = logdata.email;
    this.signinUserDTO.password = logdata.password;
    const errors = await validate(this.signinUserDTO);
    if (errors.length) {
      const error = errors.map((err) => {
        return err.constraints;
      });
      return error;
    }
  }
}

export default ErrorValidateUserDTO;
