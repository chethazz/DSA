import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [forwardRef(() => CommonModule)],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
