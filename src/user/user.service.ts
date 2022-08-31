import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async getOneByEmail(email: string) {
    return this.repo.findOne({
      email,
    });
  }

  async createOneByEmail(email: string, password: string) {
    return this.repo.save({
      email,
      password,
    });
  }
}
