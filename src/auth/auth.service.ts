import { CreateUserDTO } from "./../users/dto/user.dto";
import { SigninUserDTO, SigninResponseDTO } from "./dto/auth.dto";
import { UserService } from "./../users/user.service";
import JwtService from "../shared/service/jwt.service";

export class AuthService {
  private userService: UserService;
  private jwtService: JwtService;

  constructor() {
    this.userService = new UserService();
    this.jwtService = new JwtService();
  }

  async signin(loginData: SigninUserDTO): Promise<SigninResponseDTO> {
    try {
      const user = await this.userService.credential(loginData);

      if (!user) {
        throw new Error("no user");
      }
      const token = await this.jwtService.getToken(user.email, user.id);
      return {
        token,
        userId: user.id,
      };
    } catch (error) {
      throw error;
    }
  }

  async signup(registerData: CreateUserDTO): Promise<SigninResponseDTO> {
    try {
      const user = await this.userService.createUser(registerData);
      if (!user) {
        throw new Error("error in data");
      }

      const token = await this.jwtService.getToken(user.email, user.id);

      return {
        token,
        userId: user.id,
      };
    } catch (error) {
      throw error;
    }
  }
}
