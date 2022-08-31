import { IsOptional, IsPhoneNumber } from 'class-validator'


import { ApiProperty } from '@nestjs/swagger'

export class ForgetPassword {
    // @ApiProperty()
    // @IsOptional()
    // @IsEmail()
    // email: string

    @ApiProperty()
    @IsOptional()
    @IsPhoneNumber('IR')
    phone_number: string
}
