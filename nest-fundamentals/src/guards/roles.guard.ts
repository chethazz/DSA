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

    // If our intent is to specify 'user' as the default role, and override it selectively\
    // for certain methods, we use the getAllAndOverride() method.
    // const roles = this.reflector.getAllAndOverride(Roles, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    // To get metadata for both and merge it (this method merges both arrays and objects), use the getAllAndMerge() method:
    // const roles = this.reflector.getAllAndMerge(Roles, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    return roles.includes('admin');
  }
}
