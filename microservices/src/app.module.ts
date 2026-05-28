import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathController } from './math/math.controller';
import { ConfigController } from './config/config.controller';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AppController, MathController, ConfigController, CatsController],
  providers: [AppService, ConfigService, CatsService],
})
export class AppModule {}
