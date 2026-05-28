import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    // Static Registration (Sync)
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: {
          // For a client to communicate securely over TLS, we define tlsOption object with the CA certificate.
          // This is the certificate of authority that signed the server's certificate.
          tlsOptions: {
            ca: 'Some CA key',
          },
        },
      },
    ]),

    // Dynamic Registration (Async)
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'MATH_SERVICE_ASYNC',
        useFactory: async (configService: ConfigService) => {
          await Promise.resolve();

          return {
            transport: Transport.TCP,
            options: {
              host: configService.get('MATH_HOST'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],

  // At times we may need to fetch the transporter configuration from another service(such as ConfigService), rather than
  // hard coding it in the client application. To achieve this, we can register a custom provider using the ClientProxyFactory
  // class. This class provides a static create() method that accepts a transporter options object and returns customized
  // ClientProxy instance
  providers: [
    {
      provide: 'MATH_SERVICE_DYN',
      useFactory: (configService: ConfigService) => {
        const mathSvcOptions = configService.getMathSvcOptions();
        return ClientProxyFactory.create(mathSvcOptions);
      },
    },
  ],
})
export class MathModule {}
