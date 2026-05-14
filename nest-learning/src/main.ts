import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  // Global scoped filter. It can't inject dependencies since it's done outside
  // the context of any module. To fix this, we can register a global scoped filter
  // directly from any module. (See app.module.ts -> Providers)

  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
