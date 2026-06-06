import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport, type ClientGrpc } from '@nestjs/microservices';
import { join } from 'path';
import { Hero, HeroesService } from './hero/hero';

@Injectable()
export class AppService implements OnModuleInit {
  private heroesService: HeroesService;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  // Notice that there is a small difference compared to the technique used in other microservice transport methods.
  // Instead of the ClientProxy class, we use the ClientGrpc class, which provides the getService() method. The
  // getService() generic method takes a service name as an argument and returns its instance (if available).
  // Alternatively, we can use the @Client() decorator to instantiate a ClientGrpc object, as follows:
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(__dirname, 'hero/hero.proto'),
    },
  })
  clientDecoratorClient: ClientGrpc;
  // Finally, for more complex scenarios, we can inject a dynamically configured client using the ClientProxyFactory

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
  }

  async getHello(): Promise<Hero> {
    return this.heroesService.FindOne({ id: 1 });
  }
}
