import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RmqStatus,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // use AsyncMicroserviceOptions to use useFactory and dynamic microservice configuration
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'cats_queue',
        // To make sure a message is never lost, RabbitMQ supports message acknowledgements. An ack is sent back by consumer to tell
        // RabbitMQ that a particular message has been received, processed and that RMQ is free to delete it. If a consumer dies(its
        // channel is closed, connection is clossed, or TCP connection is lost) without sending an ack, RMQ will understand that a
        // message was not processed fully and will requeue it.
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  // Subscribing to server's status
  app.status.subscribe<RmqStatus>((status: RmqStatus) => {
    console.log(status);
  });

  // Listening to internal events of server
  app.on<RmqStatus>('error', (err) => {
    console.error(err);
  });

  // Access server's underlying driver instance
  const managerRef =
    app.unwrap<import('amqp-connection-manager').AmqpConnectionManager>();

  await app.listen();
}
bootstrap();
