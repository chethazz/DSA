import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HeroesController } from './heroes.controller';

@Module({
  imports: [
    // ClientGrpc
    // gRPC Client will not send fields that contain underscore _ in their names unless the keepCase options is set to true
    // in the proto loader configuration (options.loader.keepcase in the microservice transporter configuration).
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hero',
          protoPath: join(__dirname, 'hero/hero.proto'),
        },
      },
    ]),
  ],
  controllers: [HeroesController],
})
export class HeroesModule {}
