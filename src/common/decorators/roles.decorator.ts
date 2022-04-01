import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const RequirePermissions = (roles: string) =>
  SetMetadata('roles', roles);
