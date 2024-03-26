import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserDec } from '../common/decorators/user.decorator';
import { ResponseDTO } from '../common/dto/response.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginAuthDec } from './decorators/login-auth.dec';
import { RegisterAuthDec } from './decorators/register-auth.dec';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Login } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @LoginAuthDec()
  @Post('login')
  async login(
    @UserDec() user: User,
    @Body() login: Login,
  ): Promise<ResponseDTO> {
    const access_token = this.authService.generateAccessToken(user);
    return new ResponseDTO({ data: { ...access_token, user } });
  }

  @RegisterAuthDec()
  @Post('register')
  async create(@Body() registerDto: RegisterDto): Promise<ResponseDTO> {
    const response = await this.authService.register(registerDto);
    return new ResponseDTO({ data: response });
  }

  // @ApiOperation({ summary: 'Forgot password need phone number' })
  // @Post('password/forget')
  // async forgetPassword(
  //   @Body() forgetPassword: ForgetPassword,
  // ): Promise<ResponseDTO> {
  //   const response = await this.authService.forgetPassword(
  //     new UserEntity(forgetPassword),
  //   );
  //   return new ResponseDTO(null, response);
  // }

  // @ApiOperation({
  //   summary: 'Verify forgot password need phone number return token',
  // })
  // @Post('password/verify')
  // async passwordVerify(
  //   @Body() verify: ForgetPasswordVerify,
  // ): Promise<ResponseDTO> {
  //   const user = await this.authService.forgetPasswordVerify(verify);
  //   const token = this.authService.generateAccessToken(user);
  //   return new ResponseDTO(token);
  // }

  // @ApiOperation({ summary: 'Linear login or register with phone number' })
  // @Post('linear/login-register')
  // async linearLogin(@Body() login: LinearLogin): Promise<ResponseDTO> {
  //   return new ResponseDTO(await this.authService.linearLogin(login));
  // }

  // @ApiOperation({ summary: 'Verify user login and return token' })
  // @Post('linear/verify-login-register')
  // async linearVerify(
  //   @Body() verify: LinearRegisterVerify,
  // ): Promise<ResponseDTO> {
  //   const user = await this.authService.linearVerify(verify);
  //   const token = this.authService.generateAccessToken(user);
  //   return new ResponseDTO({ ...token, user });
  // }
}
