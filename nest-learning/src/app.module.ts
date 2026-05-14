import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './cats/http-exception.filter';
import { ValidationPipeClass } from './cats/validation.pipe';
import { logger } from './middleware/logger.(functional).middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // Dependency Injection - global
    // When using this approach to perform dependency injection for the pipe/filter, note that regardless
    // of the module where this construction is employed, the pipe/filter is, in fact, global
    // Also useClass is not the only way of dealing with custom provider registration
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipeClass,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, logger)
      .exclude(
        { path: 'cats', method: RequestMethod.POST },
        { path: 'cats', method: RequestMethod.GET },
        'cats/{*anything}',
      )
      .forRoutes(CatsController);
    // LoggerMiddleware will be bound to all routes inside CatsController except the 3 passed to exclude()
    // forRoutes({
    //   path: 'abcd/*splat',
    //   method: RequestMethod.GET,
    // }); Can be used for wildcard. Any combination works, and wrap wildcard in braces to match abcd/
    // Like 'abcd/{*something}' to make the wildcard optional
  }
}
