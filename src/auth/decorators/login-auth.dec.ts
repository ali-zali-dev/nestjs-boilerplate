import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guard/local-auth.guard';

export function LoginAuthDec() {
  return applyDecorators(
    ApiOperation({ summary: 'Login with phone number' }),
    UseGuards(LocalAuthGuard),
  );
}
