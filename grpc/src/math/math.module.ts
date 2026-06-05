import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // Create RMQ ClientProxy instance(one of the few methods)
    // Other options: ClientProxyFactory or @Client()
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          // # matches zero or more words, * matches one word
          wildcards: true,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class MathModule {}
