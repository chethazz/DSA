import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Server,
  TcpEvents,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // use AsyncMicroserviceOptions to use useFactory and dynamic microservice configuration
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      // The options property is specific to the chosen transporter. The Redis transporter
      // exposes the properties described below.
      options: {
        host: 'localhost',
        port: 6379,
      },
    },
  );

  // Subscribing to server's status
  app.status.subscribe((status) => {
    console.log(status);
  });

  // Listening to internal events of server
  app.on<TcpEvents>('error', (err) => {
    console.error(err);
  });

  // Access server's underlying driver instance
  const netServer = app.unwrap<Server>();

  await app.listen();
}
bootstrap();
