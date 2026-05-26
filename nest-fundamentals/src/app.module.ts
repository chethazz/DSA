import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common/common.service';
import { ConfigModule } from './config/config.module';
import { LazyService } from './lazy/lazy.service';
import { ModuleRefService } from './module-ref/module-ref.service';
import { HelloService } from './hello.service';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.register({ isGlobal: true, folder: './config' }),
    CatsModule,
  ],
  // For custom providers, set durable property to true to make it durable
  controllers: [AppController],
  providers: [
    AppService,
    CommonService,
    ModuleRefService,
    LazyService,
    HelloService,
    CatsService,
  ],
})
export class AppModule {}
