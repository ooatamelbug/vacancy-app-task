import { CreateUserDTO } from "./../users/dto/user.dto";
import { LoginUserDTO, LoginresponseDTO } from "./dto/auth.dto";
import { UserService } from "./../users/user.service";
import JwtService from "../shared/service/jwt.service";

export class AuthService {
  private userService: UserService;
  private jwtService: JwtService;
  
  constructor() {
    this.userService = new UserService();
    this.jwtService = new JwtService();
  }

  async login(loginData: LoginUserDTO): Promise<LoginresponseDTO> {
    try {
      const user = await this.userService.credential(loginData);

      if (!user) {
        throw new Error("no user");
      }
      const token = await this.jwtService.getToken(
        user.email,
        user.id.toString()
      );
      return {
        token,
        userId: user.id.toString(),
      };
    } catch (error) {
      throw error;
    }
  }

  async register(registerData: CreateUserDTO): Promise<LoginresponseDTO> {
    try {
      const user = await this.userService.createUser(registerData);
      if (!user) {
        throw new Error("error in data");
      }

      const token = await this.jwtService.getToken(
        user.email,
        user.id.toString()
      );
      
      return {
        token,
        userId: user.id.toString(),
      };
    } catch (error) {
      throw error;
    }
  }
}
