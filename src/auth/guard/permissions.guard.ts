import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requestPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requestPermissions) return true;
    const request = context.switchToHttp().getRequest();
    const userFound = await this.userService.findOne(request.user.id);
    if (userFound.email === 'superadmin@tarahaniranian.com') return true;
    const permissions: Set<string> = new Set();
    for (const role of userFound.roles) {
      for (const perm of role.permissions) {
        permissions.add(perm.name);
      }
    }
    /**
     * request permissions example
     * @Permissions(a, b)       a or b
     * @Permissions([a, b])       a and b
     * @Permissions([a, b],[c,d])       (a and b) or (c and d)
     */
    return requestPermissions.some((permElement: string | []) => {
      if (typeof permElement === 'string') {
        if (permissions.has(permElement)) return true;
      } else
        return permElement.every((permElementAnd: string) =>
          permissions.has(permElementAnd),
        );
    });
  }
}
