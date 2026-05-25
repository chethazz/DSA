import { Controller, Get } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Controller('lazy-test')
export class LazyTestController {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  @Get()
  async triggerLazyLoad() {
    //   Obtain reference to LazyService provider
    const { LazyModule } = await import('./lazy.module.js');
    const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

    const { LazyService } = await import('./lazy.service.js');
    const lazyService = moduleRef.get(LazyService);

    return lazyService;
  }
}
