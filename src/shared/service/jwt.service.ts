import * as jwt from "jsonwebtoken";

class JwtService {
  async getToken(email: string, userId: string): Promise<string> {
    const payload = {
      email,
      sub: userId,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRECT, {
      expiresIn: `${process.env.JWT_EXPIRESIN}`,
    });

    return token;
  }

  async verifyToken(token: string): Promise<string | jwt.JwtPayload> {
    const access = await jwt.verify(token, process.env.JWT_SECRECT);
    return access;
  }
}

export default JwtService;