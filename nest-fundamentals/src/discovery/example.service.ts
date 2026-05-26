import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { DiscoveryFlag } from '../decorators/discovery.decorator';

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

  getMetadata() {
    const controllers = this.discoveryService.getControllers();

    const [controller] = controllers.filter(
      (item) =>
        this.discoveryService.getMetadataByDecorator(DiscoveryFlag, item) ===
        'experimental',
    );

    console.log(controller);
  }
}
