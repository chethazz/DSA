import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';

@Controller('math')
export class MathController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  // In complex scenarios, we may need to access additional information about the incoming request.
  // When using redis transporter, we can access RedisContext object
  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: RedisContext) {
    console.log(context.getChannel());
  }
}
