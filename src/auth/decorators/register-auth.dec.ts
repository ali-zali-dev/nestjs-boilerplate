import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function RegisterAuthDec() {
  return applyDecorators(ApiOperation({ summary: 'Login with phone number' }));
}
