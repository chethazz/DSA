import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
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

  // After enabling wildcards option in main.ts, we can use wildcards in our message and event patterns. For eg: to subscribe to
  // all channels starting with notifications, we can use following pattern.
  @EventPattern('notifications.*')
  handleWildcardNotifications(
    @Payload() data: any,
    @Ctx() context: RedisContext,
  ) {
    console.log(context.getChannel());
  }
}
