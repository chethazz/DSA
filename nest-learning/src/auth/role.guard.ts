import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Roles } from './roles.decorator';

// Like pipes and exception filters guards can be controller, method or global scoped
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    // const user = request.user;
    return matchRoles(roles);
  }
}

const matchRoles = (roles: string[], userRoles?: string[]) => {
  console.log(...roles);
  return true;
};

// Note that behind the scenes, when a guard returns false, the framework throws a ForbiddenException.
// If we want to return a different error response, we should throw your own specific exception
