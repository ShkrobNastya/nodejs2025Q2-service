import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../../db/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  getAllUsers() {
    return this.repo.find();
  }

  async getUserById(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) return null;
    return user;
  }

  async getUserByLogin(login: string) {
    const user = await this.repo.findOne({ where: { login } });
    if (!user) return null;
    return user;
  }

  createUser(body: CreateUserDto) {
    const currentTime = Date.now();
    const newUser = this.repo.create({
      login: body.login,
      password: body.password,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    });

    return this.repo.save(newUser);
  }

  async updatePassword(id: string, body: UpdatePasswordDto) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) return null;

    if (user.password !== body.oldPassword) {
      return 'Wrong password';
    }

    user.password = body.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return this.repo.save(user);
  }

  async deleteUser(id: string) {
    const result = await this.repo.delete(id);
    return result.affected > 0;
  }
}
