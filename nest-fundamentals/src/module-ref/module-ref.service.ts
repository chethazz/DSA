import { Injectable, OnModuleInit } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { CatsService } from '../cats/cats.service';
import { CommonService } from '../common/common.service';

@Injectable()
export class ModuleRefService implements OnModuleInit {
  private service: CommonService;
  private transientService: CatsService;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    // By default, get method in moduleRef returns a provider, controller, or injectable (e.g., guard, interceptor, etc.)
    this.service = this.moduleRef.get(CommonService);
  }

  // You can't retrieve scoped providers (transient or request-scoped) with the get() method
  // To retrieve a provider from global context
  onModuleInitScoped() {
    return this.moduleRef.get(CatsService, { strict: false });
  }

  // To dynamically resolve scoped providers, use resolve() method passing provider's injection token as arg
  // The resolve() method returns a unique instance of the provider, from its own DI container subtree. Each subtree
  // has a unique context identifier. Thus if we call this method more than once and compare instance references, they're
  // different
  async onModuleInitDyn() {
    // this.service = await this.moduleRef.resolve(CatsService);
    const transientServices = await Promise.all([
      this.moduleRef.resolve(CatsService),
      this.moduleRef.resolve(CatsService),
    ]);
    console.log(transientServices[0] === transientServices[1]); // false
  }

  // To generate single instance across multiple resolve() calls, and ensure they share the same generated DI container subtree,
  // we can pass a context identifier to resolve. Use ContextIdFactory class to generate an identifier
  async onModuleInitSingleInstance() {
    const contextId = ContextIdFactory.create();
    const transientServices = await Promise.all([
      this.moduleRef.resolve(CatsService, contextId),
      this.moduleRef.resolve(CatsService, contextId),
    ]);
    console.log(transientServices[0] === transientServices[1]); // true
  }

  // Manually generated context identifiers (with ContextIdFactory.create()) represent DI sub-trees in which
  // REQUEST provider is undefined as they are not instantiated and managed by the Nest dependency injection system.
  // To register a custom REQUEST object for manually created DI subtree, use ModuleRef#registerRequestByContextId() method
  // async onModuleInitSingleWithReq() {
  //   const contextId = ContextIdFactory.create();
  //   this.moduleRef.registerRequestByContextId(RequestObject, contextId);
  // }
}
