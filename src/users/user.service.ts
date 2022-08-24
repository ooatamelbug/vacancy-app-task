import { ObjectId } from 'mongodb';
import { CreateUserDTO, CredentialDTO, GetUserDTO, UpdateUserDTO } from "./dto/user.dto";
import { UserRepository } from "./user.repository";
import * as bcryptjs from "bcryptjs";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findUser(userData: GetUserDTO) {
    return await this.userRepository.getOne(userData);
  }

  async updateUser(updateData: UpdateUserDTO, email: string) {
    try {
      const user = await this.findUser({email: updateData.email});
      if(user) {
        if(String(updateData.id) !== user.id.toString()) {
          throw new Error('there are anthor user have this email');
        } else {
          return this.userRepository.update(updateData, email);
        }
      } else {
        throw new Error('error in data');
      }
    } catch (error) {
      throw error;
    }
  }

  async createUser(userCreate: CreateUserDTO) {
    try {
      const user = await this.findUser({ email: userCreate.email });
      if (user !== null) {
        throw new Error("this user is exist with this email");
      }

      const newPassword = await bcryptjs.hash(userCreate.password, 12);
      userCreate.password = newPassword;
      
      return await this.userRepository.create(userCreate);
    } catch (error) {
      throw error;
    }
  }

  async credential(credentialData: CredentialDTO) {
    try {
      const user = await this.userRepository.getOne({
        email: credentialData.email,
      });

      if (!user) {
        throw new Error("not exist");
      }

      const confirmpassword = await bcryptjs.compare(
        credentialData.password,
        user.password
      );

      if (!confirmpassword) {
        throw new Error("bad credential");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
