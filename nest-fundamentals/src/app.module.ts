import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { CommonService } from './common/common.service';
import { ConfigModule } from './config/config.module';
import { HelloService } from './hello.service';
import { LazyService } from './lazy/lazy.service';
import { LifecycleService } from './lifecycle/lifecycle.service';
import { ModuleRefService } from './module-ref/module-ref.service';

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
    LifecycleService,
  ],
})
export class AppModule {}
