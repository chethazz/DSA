import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

@Injectable()
export class ExampleService {
  constructor(private readonly discoveryService: DiscoveryService) {}

  getAllProviders() {
    // Each provider object contains information such as its instance, token, and metadata
    const providers = this.discoveryService.getProviders();
    console.log(providers);
  }

  getAllControllers() {
    const controllers = this.discoveryService.getControllers();
    console.log(controllers);
  }
}
