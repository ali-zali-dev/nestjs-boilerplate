import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'


import { ApiPropertyOptional } from '@nestjs/swagger'

export class TakeSkipDTO {
    @ApiPropertyOptional()
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    take: number

    @ApiPropertyOptional()
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    skip: number
}
