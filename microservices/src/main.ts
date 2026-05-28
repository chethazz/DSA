import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  TcpEvents,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
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

  await app.listen();
}
bootstrap();
