import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ExampleService } from './example.service';

// DiscoveryService allows devs to dynamically inspect and retrieve providers, controllers and other metadata.
// Before using DiscoveryService, you need to import the DiscoveryModule in the module where you intend to use it.
// This ensures that the service is available for dependency injection. Below is an example of how to configure
// it within a NestJS module:
@Module({
  imports: [DiscoveryModule],
  providers: [ExampleService],
})
export class ExampleModule {}
