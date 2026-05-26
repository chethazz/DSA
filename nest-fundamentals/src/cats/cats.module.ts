import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ExampleModule } from '../discovery/example.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [forwardRef(() => CommonModule), ExampleModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
