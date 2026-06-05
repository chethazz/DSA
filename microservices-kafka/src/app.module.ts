import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { ConfigController } from './config/config.controller';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MathController } from './math/math.controller';

@Module({
  imports: [ConfigModule],
  controllers: [
    AppController,
    MathController,
    ConfigController,
    CatsController,
  ],
  providers: [AppService, ConfigService, CatsService],
})
export class AppModule {}
