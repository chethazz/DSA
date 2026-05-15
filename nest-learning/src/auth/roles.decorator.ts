import { Reflector } from '@nestjs/core';

// Custom metadata comes into play when we want to match roles to routes in flexible and reusable way.
// Nest provides the ability to attach custom metadata to route handlers through either decorators
// created via Reflector.createDecorator static method, or the built-in @SetMetadata() decorator.

// @Roles() decorator using the Reflector.createDecorator method will
// attach the metadata to the handler
export const Roles = Reflector.createDecorator<string[]>();
