import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  HttpCode,
  NotFoundException,
  ParseUUIDPipe,
  ForbiddenException,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put('/:id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    const result = await this.userService.updatePassword(id, dto);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    if (result === 'Wrong password') {
      throw new ForbiddenException('Old password is wrong');
    }
    return result;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.deleteUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
