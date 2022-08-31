import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Login } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { CrudRequest } from '@nestjsx/crud';
import reqCrud, { CrudRequestDto } from '../shared/dto/req-crud.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    email = email.toLowerCase();
    const user = await this.userService.getOneByEmail(email);
    if (!user) return null;
    const isValidPass = await compare(password, user.password);
    if (isValidPass) {
      return user;
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.getOneByEmail(registerDto.email);
    if (user) {
      throw new BadRequestException();
    }
    return this.userService.createOneByEmail(
      registerDto.email,
      registerDto.password,
    );
  }

  async login(login: Login) {
    // let userFound: UserEntity;
    // /**
    //  * Check user login with userName or email or phone and user exist
    //  */
    // if (login.user_name) {
    //   userFound = await this.usersRepository.findOne({
    //     user_name: login.user_name,
    //   });
    // } else if (login.phone_number) {
    //   userFound = await this.usersRepository.findOne({
    //     phone_number: login.phone_number,
    //   });
    // } else if (login.national_id) {
    //   userFound = await this.usersRepository.findOne({
    //     relations: ['student'],
    //     join: {
    //       alias: 'user',
    //       innerJoin: { student: 'user.student' },
    //     },
    //     where: (qb) => {
    //       qb.where().andWhere('student.national_id IN (:...id)', {
    //         id: [login.national_id],
    //       });
    //     },
    //   });
    //   if (!userFound)
    //     throw new HttpException(StudentErrorEnum.STUDENT_NOT_FOUND, 404);
    // } else {
    //   throw new HttpException(
    //     AuthErrorEnum.ENTER_PHONE_NUMBER_OR_EMAIL_FIELD,
    //     401,
    //   );
    // }
    // if (userFound) {
    //   if (!userFound.is_active) {
    //     throw new HttpException(AuthErrorEnum.ACCOUNT_IS_INACTIVE, 404);
    //   }
    //   if (userFound.password && userFound.password !== '') {
    //     if (await compare(login.password, userFound.password)) {
    //       return userFound;
    //     } else {
    //       throw new HttpException(AuthErrorEnum.PASSWORD_IS_INCORRECT, 401);
    //     }
    //   } else {
    //     throw new HttpException(AuthErrorEnum.USER_DID_NOT_SET_PASSWORD, 401);
    //   }
    // } else {
    //   throw new HttpException(AuthErrorEnum.USER_NOT_FOUND, 401);
    // }
  }

  generateAccessToken(user: User) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
