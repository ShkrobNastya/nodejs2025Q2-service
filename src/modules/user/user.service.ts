import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../../db/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly saltRounds = Number(process.env.CRYPT_SALT) || 10;

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

  async createUser(body: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(body.password, this.saltRounds);
    const currentTime = Date.now();
    const newUser = this.repo.create({
      login: body.login,
      password: hashedPassword,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    });

    return this.repo.save(newUser);
  }

  async updatePassword(id: string, body: UpdatePasswordDto) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) return null;

    console.log(body.oldPassword, user.password);
    const match = await bcrypt.compare(body.oldPassword, user.password);

    if (!match) {
      return 'Wrong password';
    }

    user.password = await bcrypt.hash(body.newPassword, this.saltRounds);
    user.version += 1;
    user.updatedAt = Date.now();

    return this.repo.save(user);
  }

  async deleteUser(id: string) {
    const result = await this.repo.delete(id);
    return result.affected > 0;
  }
}
