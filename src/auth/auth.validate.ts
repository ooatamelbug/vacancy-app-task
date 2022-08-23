import { CreateUserDTO } from "./../users/dto/user.dto";
import { validate } from "class-validator";
import { LoginUserDTO } from "./dto/auth.dto";

class ErrorValidateUserDTO {
  public createUserDTO: CreateUserDTO;
  public loginUserDTO: LoginUserDTO

  constructor() {
    this.createUserDTO = new CreateUserDTO();
    this.loginUserDTO = new LoginUserDTO();
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

  async validateLoginUser(logdata: LoginUserDTO) {
    this.loginUserDTO.email = logdata.email;
    this.loginUserDTO.password = logdata.password;
    const errors = await validate(this.loginUserDTO);
    if (errors.length) {
      const error = errors.map((err) => {
        return err.constraints;
      });
      return error;
    }
  }
}

export default ErrorValidateUserDTO;
