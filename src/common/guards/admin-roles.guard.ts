import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ERoleUser } from 'src/modules/users/user.enum';

@Injectable()
export class AdminRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('roles', roles);
    if (user.role == ERoleUser.SUPERADMIN || !roles) {
      return true;
    }
    if (!user.permission) {
      throw new UnauthorizedException();
    }
    console.log(user.permission[roles]);
    if (user.permission[roles]) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
@Injectable()
export class SuperAdminRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.role == ERoleUser.SUPERADMIN) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
