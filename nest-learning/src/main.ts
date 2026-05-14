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

  // Global scoped pipe
  // In the case of hybrid apps the useGlobalPipes() method doesn't set up pipes for gateways
  // and microservices. For "standard" (non-hybrid) microservice apps, useGlobalPipes()
  // does mount pipes globally.
  // app.useGlobalPipes(new ValidationPipeClass());
  // In terms of dependency injection, global pipes registered from outside of any module
  // (with useGlobalPipes() as in the example above) cannot inject dependencies since the
  // binding has been done outside the context of any module. In order to solve this issue
  // use provider construction(check Providers in app.module.ts)

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
