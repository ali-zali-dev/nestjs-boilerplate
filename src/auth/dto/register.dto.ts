import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  fcmToken: string;
}
