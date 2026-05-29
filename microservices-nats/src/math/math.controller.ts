import { Controller, Inject, OnApplicationBootstrap } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  NatsContext,
  NatsRecordBuilder,
  NatsStatus,
  Payload,
} from '@nestjs/microservices';
import * as nats from 'nats';

@Controller('math')
export class MathController implements OnApplicationBootstrap {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  onApplicationBootstrap() {
    // To get real time updates on connection and state of underlying instance, we can subscribe to the status stream. This stream
    // provides status updates specific to the chosen driver
    this.client.status.subscribe<NatsStatus>((status: NatsStatus) => {
      console.log(status);
    });

    // In some cases, we might want to listen to internal events emitted by microservice. For eg: we could listen for the error
    // event to trigger additional operation when an error occurs.
    this.client.on('error', (err) => {
      console.error(err);
    });

    // For more advanced use cases, we may need to acess the underlying driver instance. This can be useful for scenarios like
    // manually closing the connection or using driver-specific methods.(Avoid this)
    const natsConnection = this.client.unwrap<import('nats').NatsConnection>();
  }

  // In complex scenarios, we may need to access additional information about the incoming request.
  // When using NATS transporter, we can access MqttContext object
  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: NatsContext) {
    console.log(context.getSubject());
  }

  // After enabling wildcards option in main.ts, we can use wildcards in our message and event patterns. For eg: to subscribe to
  // all channels starting with notifications, we can use following pattern.
  @EventPattern('notifications*')
  handleWildcardNotifications(
    @Payload() data: any,
    @Ctx() context: NatsContext,
  ) {
    // To access the original mqtt packet, use the getPacket() method of the MqttContext object
    console.log(context.getSubject());
  }

  // Acts as client
  // To configure message options, we can use NatsRecordBuilder class.
  sendNatsRecord() {
    const headers = nats.headers();
    headers.set('x-version', '1.0.0');

    const record = new NatsRecordBuilder(':math:').setHeaders(headers).build();

    this.client.send('replace-emoji-nats', record).subscribe((res) => {
      console.log(res);
    });
  }

  // Server side - reading options using NatsContext
  @MessagePattern('replace-emoji')
  replaceEmoji(@Payload() data: string, @Ctx() context: NatsContext): string {
    const headers = context.getHeaders() as Record<
      string,
      string[] | string | undefined
    >;
    return headers['x-version'] === '1.0.0' ? '🐱' : '🐈';
  }
}
