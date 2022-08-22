import { LoginUserDTO } from './dto/auth.dto';
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { Error } from 'mongoose';
import { CreateUserDTO } from "./../users/dto/user.dto";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
        const authUser = await this.authService.login(req.body as LoginUserDTO);
        
        if (!authUser.token) {
            throw new Error('error in auth');
        }

        req.headers.user = authUser.userId;
        res.status(200).json({
            token: authUser.token,
        });
    } catch (error) {
        throw error;
    }
  }

  async register(req: Request, res: Response) {
    try {
        const authUser = await this.authService.register(req.body as CreateUserDTO);
        
        if (!authUser.token) {
            throw new Error('error in auth');
        }

        req.headers.user = authUser.userId;
        res.status(200).json({
            token: authUser.token,
        });
    } catch (error) {
        throw error;
    }
  }
}
