import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly saltRounds = Number(process.env.CRYPT_SALT) || 10;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const newUser = await this.userService.createUser(dto);

    return newUser;
  }

  async login(dto: LoginDto) {
    const user = await this.userService.getUserByLogin(dto.login);
    if (!user) return null;

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) return 'Invalid password';

    return this.generateTokens(user.id, user.login);
  }

  async refresh(dto: RefreshDto) {
    try {
      const payload = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      return this.generateTokens(payload.userId, payload.login);
    } catch (err) {
      return 'Invalid or expired refresh token';
    }
  }

  private generateTokens(userId: string, login: string) {
    const payload = { userId, login };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
    });

    return { accessToken, refreshToken };
  }
}
