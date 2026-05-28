import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Server,
  TcpEvents,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      // When communicating outside of a private network, it's important to encrypt traffic to ensure security.
      // In NestJS, it can be achieved with TLS over TCP.
      // To enable TLS for a TCP server, we need both a private key and a certificate in PEM format.
      // These are added to the server's options by setting the tlsOptions
      options: {
        tlsOptions: {
          key: 'Some key',
          cert: 'Certificate',
        },
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
