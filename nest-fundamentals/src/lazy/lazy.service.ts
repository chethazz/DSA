import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Injectable()
export class LazyService {
  // To load modules on-demand, Nest provides the LazyModuleLoader class that can be injected into a class in the normal way:
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  async loadFeatureOnDemand() {
    const { LazyModule } = await import('./lazy.module.js');

    const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

    return 'Lazy loaded successfully';
  }
}
