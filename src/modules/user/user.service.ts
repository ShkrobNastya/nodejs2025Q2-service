import { UpdatePasswordDto } from './dto/update-password.dto';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { db } from '../../db/db';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  getAllUsers() {
    return db.users;
  }

  getUserById(id: string) {
    const user = db.users.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }

  createUser(body: CreateUserDto) {
    const currentTime = Date.now();
    const newUser: User = {
      id: uuid(),
      login: body.login,
      password: body.password,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
    db.users.push(newUser);

    return newUser;
  }

  updatePassword(id: string, body: UpdatePasswordDto) {
    const user = db.users.find((user) => user.id === id);
    if (!user) return null;

    if (user.password !== body.oldPassword) {
      return 'Wrong password';
    }

    user.password = body.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  deleteUser(id: string) {
    const index = db.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    db.users.splice(index, 1);
    return true;
  }
}
