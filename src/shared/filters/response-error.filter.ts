import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { ResponseDTO } from '../dto/response.dto';

@Catch()
export class ResponseErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = exception.status
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;
    console.error(exception);

    if (exception) {
      // if (exception.code.toString().length === 4) {
      //     return response.status(status).json(exception)
      // }
      if (typeof exception.response === 'string') {
        message = exception.response;
      } else if (typeof exception.response === 'object') {
        message = exception.response.message;
      } else if (typeof exception.message === 'string') {
        message = exception.message;
        status = 400;
      } else {
        console.error(exception);
      }
    } else {
      message = 'Internal server error';
    }
    response.status(status).json(
      ResponseDTO.error({
        message,
        status,
      }),
    );
  }
}
