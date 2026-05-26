import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

// To access the route's role(s) (custom metadata), we'll use the Reflector helper class again.
// Reflector can be injected into a class in the normal way:
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());

    return roles.includes('admin');
  }
}
