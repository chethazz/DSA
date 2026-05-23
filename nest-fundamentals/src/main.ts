import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AggregateByTenantContextIdStrategy } from './durable.provider';

async function bootstrap() {
  // We can apply this anywhere since it's global anyway
  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
