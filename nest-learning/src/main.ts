import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './cats/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  // Global scoped filter. It can't inject dependencies since it's done outside
  // the context of any module. To fix this, we can register a global scoped filter
  // directly from any module. (See app.module.ts -> Providers)
  // app.useGlobalFilters(new HttpExceptionFilter());

  // Global filters can extend the base filter. this can be done in either of two ways.
  // First method is to inject the HttpAdapter reference when instantiating the custom global filter.
  // Second method is to use APP_FILTER token
  // AllExceptionFilter should be at the end, after all other exception filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
