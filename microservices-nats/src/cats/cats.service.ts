import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT, type RequestContext } from '@nestjs/microservices';

// Request-scoped handlers and providers can inject RequestContext using the @Inject() decorator
// in combination with the CONTEXT token:
@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(CONTEXT) private ctx: RequestContext) {}
}
