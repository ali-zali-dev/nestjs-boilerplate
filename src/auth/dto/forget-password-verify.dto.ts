import { IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator'


import { ApiProperty } from '@nestjs/swagger'

export class ForgetPasswordVerify {
    @ApiProperty()
    @IsNotEmpty()
    code: string

    @ApiProperty()
    @IsPhoneNumber('IR')
    @IsOptional()
    phone_number: string
}
