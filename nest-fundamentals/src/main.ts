import { ContextIdFactory, LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AggregateByTenantContextIdStrategy } from './durable.provider';

async function bootstrap() {
  // We can apply this anywhere since it's global anyway
  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());

  const app = await NestFactory.create(AppModule);

  // We can obtain reference to LazyModuleLoader provider from within the application bootstrap file(main.ts)
  const lazyModuleLoader = app.get(LazyModuleLoader);

  // Starts listening for shutdown hooks. Disabled by default bc of resource usage
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
