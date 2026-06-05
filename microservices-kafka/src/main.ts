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
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
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
