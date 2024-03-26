import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDec = createParamDecorator(
  (data: any, req: ExecutionContext) => req.switchToHttp().getRequest().user,
);
