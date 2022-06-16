import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { WsJwtAuthGuard } from './guard/context-jwt-auth-guards/ws-jwt-auth.guard';
import { HttpJwtAuthGuard } from './guard/context-jwt-auth-guards/http-jwt-auth.guard';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
dotenv.config();
@Global()
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME },
    }),
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    HttpJwtAuthGuard,
    WsJwtAuthGuard,
  ],
  exports: [HttpJwtAuthGuard, WsJwtAuthGuard],
})
export class AuthModule {}
