import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/role.decorators';
import { Role } from '../model/roles.model';
import { PayloadToken } from '../model/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: Role[] = this.reflector.get(ROLES_KEY, context.getHandler());

    if (!roles) return true;

    // ['admin']
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken; // {role: 'admin, sub: id}

    const isAuth = roles.some((role) => role === user.role);

    if (!isAuth) throw new UnauthorizedException('Your role is wrong!');

    return isAuth;
  }
}
