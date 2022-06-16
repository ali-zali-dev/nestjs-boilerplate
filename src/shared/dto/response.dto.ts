import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface Input {
  data?: any;
  message?: string;

  status?: number;

  meta?: any;
}
export class ResponseDTO {
  constructor(input: Input) {
    this.data = input.data;
    this.message = input.message;
    this.status = input.status;
    this.meta = input.meta;
  }

  @IsNotEmpty()
  data: any;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  meta: any;

  static returnSuccessData(data: any): ResponseDTO {
    const input: Input = {
      data,
      message: 'Success',
      status: 200,
      meta: '',
    };
    return new ResponseDTO(input);
  }

  static success(input: Input): ResponseDTO {
    input.message = input.message || 'Success';
    input.status = input.status || 200;
    return new ResponseDTO(input);
  }

  static error(input: Input): ResponseDTO {
    input.message = input.message || 'Error';
    input.status = input.status || 400;
    return new ResponseDTO(input);
  }
}
