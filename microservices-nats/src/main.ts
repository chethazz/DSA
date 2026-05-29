import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  NatsEvents,
  NatsStatus,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // use AsyncMicroserviceOptions to use useFactory and dynamic microservice configuration
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'],
        // NATS provides a built in load balancing feature called distributed queues. Use the queue property
        queue: 'cats_queue',
        // In some cases we might wanna configure headers for multiple requests, we can pass thhese as options
        headers: { 'x-version': '1.0.0' },
      },
    },
  );

  // Subscribing to server's status
  app.status.subscribe<NatsStatus>((status: NatsStatus) => {
    console.log(status);
  });

  // Listening to internal events of server
  app.on<NatsEvents>('error', (err) => {
    console.error(err);
  });

  // Access server's underlying driver instance
  const natsConnection = app.unwrap<import('mqtt').MqttClient>();

  await app.listen();
}
bootstrap();
