import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloService } from './hello/hello.service';
import { HelloController } from './hello/hello.controller';
import { HelloModule } from './hello/hello.module';

@Module({
  controllers: [AppController, HelloController],
  providers: [AppService, HelloService],
  imports: [HelloModule],
})
export class AppModule {}
