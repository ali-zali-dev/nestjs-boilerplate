import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsEmail,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Login {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber('IR')
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
