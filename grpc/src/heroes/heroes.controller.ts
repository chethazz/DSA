import { Metadata, type ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Hero, HeroById, HeroesService } from '../hero/hero';

@Controller()
export class HeroesController implements OnModuleInit {
  private heroesService: HeroesService;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  // gRPC server handler
  @GrpcMethod('HeroesService', 'FindOne')
  findOne(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero | undefined {
    const serverMetadata = new Metadata();
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];

    serverMetadata.add('Set-Cookie', 'yummy_cookie=choco');
    call.sendMetadata(serverMetadata);

    return items.find(({ id }) => id === data.id);
  }

  // HTTP endpoint - calls gRPC client without metadata
  @Get()
  call(): Promise<Hero> {
    return this.heroesService.FindOne({ id: 1 });
  }

  // HTTP endpoint - calls gRPC client with metadata
  @Get('metadata')
  callWithMetadata(): Promise<Hero> {
    const metadata = new Metadata();
    metadata.add('Set-Cookie', 'yummy_cookie=choco');

    return this.heroesService.FindOne({ id: 1 }, metadata);
  }
}
