import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HelloController } from './hello.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hello',
          protoPath: join(__dirname, 'hello.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [HelloController],
  exports: [ClientsModule],
})
export class HelloModule {}
