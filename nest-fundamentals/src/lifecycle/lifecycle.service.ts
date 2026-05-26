import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';

// To register a method to be called during module initialization on a particular class (e.g., Controller, Provider or Module),
// implement the OnModuleInit interface by supplying an onModuleInit() method, as shown below:
@Injectable()
export class LifecycleService implements OnModuleInit, OnApplicationShutdown {
  onModuleInit() {
    console.log('The module has been initialized');
  }

  // Could be async
  // async onModuleInit(): Promise<void> {
  //    await this.fetch();
  // }

  onApplicationShutdown(signal: string) {
    console.log(signal);
  }
}
