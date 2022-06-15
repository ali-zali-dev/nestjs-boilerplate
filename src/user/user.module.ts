import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdminModule } from '@adminjs/nestjs';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database, Resource } from '@adminjs/typeorm';
import adminjs from 'adminjs';

adminjs.registerAdapter({ Database, Resource });

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [User],
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
