import { forwardRef, Module } from '@nestjs/common';
import { CatsModule } from '../cats/cats.module';
import { CommonService } from './common.service';

@Module({
  imports: [forwardRef(() => CatsModule)],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
