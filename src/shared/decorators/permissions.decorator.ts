import { SetMetadata } from '@nestjs/common';

export const PermissionsDec = (...permissions: any[]) =>
  SetMetadata('permissions', permissions);
