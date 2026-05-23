import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CommonService } from '../common/common.service';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class CatsService {
  // If we want to resolve an instance of a request scoped provider within a request context. Let's say that CatsService
  // is request scoped and we want to resolve the CatsRepository instance which is also marked as a request scoped provider.
  // In order to share same DI container subtree, we must obtain the current context identifier instead of generating a new one.
  // To obtain that, start by injecting the request object using @Inject()
  // See ModuleRefService
  constructor(
    @Inject(REQUEST)
    private request: Record<string, unknown>,

    @Inject(forwardRef(() => CommonService))
    private context,
  ) {}
}
