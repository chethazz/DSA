import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommonService } from '../common/common.service';

@Injectable()
export class ModuleRefService implements OnModuleInit {
  private service: CommonService;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    // By default, get method in moduleRef returns a provider, controller, or injectable (e.g., guard, interceptor, etc.)
    this.service = this.moduleRef.get(CommonService);
  }
}
