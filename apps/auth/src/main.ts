import { AUTH_PACKAGE_NAME } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../auth.proto'),
        // referencing the generated AUTH_PACKAGE_NAME instead of manually creating one(previously we had to do that, check commit history)
        package: AUTH_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
