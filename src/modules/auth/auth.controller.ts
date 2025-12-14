import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createUser(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);

    if (!result) {
      throw new ForbiddenException('User not found');
    }

    if (result === 'Invalid password') {
      throw new ForbiddenException('Old password is wrong');
    }

    return result;
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    const result = await this.authService.refresh(dto);
    if (result === 'Invalid or expired refresh token') {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
