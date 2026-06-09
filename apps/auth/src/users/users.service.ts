import { CreateUserDto, UpdateUserDto, User, Users } from '@app/common';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let i = 0; i <= 100; i++) {
      this.create({ username: randomUUID(), password: randomUUID(), age: 0 });
    }
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };

    this.users.push(user);
    return user;
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== 1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };

      return this.users[userIndex];
    }

    throw new NotFoundException(`User not found by id ${id}`);
  }

  remove(id: string): User {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      return this.users.splice(userIndex)[0];
    }

    throw new NotFoundException(`User not found by id ${id}`);
  }
}
