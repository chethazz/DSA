import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { CommonService } from './common/common.service';

@Module({
  imports: [ConfigModule.register({ isGlobal: true, folder: './config' })],
  // For custom providers, set durable property to true to make it durable
  controllers: [AppController],
  providers: [AppService, CommonService],
})
export class AppModule {}
