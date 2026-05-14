import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './cats/http-exception.filter';
import { logger } from './middleware/logger.(functional).middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // Dependency Injection - global
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
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
