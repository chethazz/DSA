import { Controller, Inject, OnApplicationBootstrap } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RedisContext,
  RedisStatus,
} from '@nestjs/microservices';

@Controller('math')
export class MathController implements OnApplicationBootstrap {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  onApplicationBootstrap() {
    // To get real time updates on connection and state of underlying instance, we can subscribe to the status stream. This stream
    // provides status updates specific to the chosen driver(Redis in this case)
    this.client.status.subscribe<RedisStatus>((status: RedisStatus) => {
      console.log(status);
    });

    // In some cases, we might want to listen to internal events emitted by microservice. For eg: we could listen for the error
    // event to trigger additional operation when an error occurs.
    this.client.on('error', (err) => {
      console.error(err);
    });
  }

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
