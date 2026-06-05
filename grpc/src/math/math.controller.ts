import { Controller, Inject, OnApplicationBootstrap } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RmqRecordBuilder,
  RmqStatus,
} from '@nestjs/microservices';
import { Channel, Message } from 'amqplib';

@Controller('math')
export class MathController implements OnApplicationBootstrap {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  onApplicationBootstrap() {
    // To get real time updates on connection and state of underlying instance, we can subscribe to the status stream. This stream
    // provides status updates specific to the chosen driver
    this.client.status.subscribe<RmqStatus>((status: RmqStatus) => {
      console.log(status);
    });

    // In some cases, we might want to listen to internal events emitted by microservice. For eg: we could listen for the error
    // event to trigger additional operation when an error occurs.
    this.client.on('error', (err) => {
      console.error(err);
    });

    // To send a message with a specific routing key, we can use send() method of ClientProxy
    this.client
      .send('cats.meow', { message: 'Meow!' })
      .subscribe((response) => {
        console.log(response);
      });

    // For more advanced use cases, we may need to acess the underlying driver instance. This can be useful for scenarios like
    // manually closing the connection or using driver-specific methods.(Avoid this)
    const managerRefn =
      this.client.unwrap<
        import('amqp-connection-manager').AmqpConnectionManager
      >();
  }

  // In complex scenarios, we may need to access additional information about the incoming request.
  // When using NATS transporter, we can access MqttContext object
  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    const channel = context.getChannelRef() as Channel;
    const originalMsg = context.getMessage() as Message;

    channel.ack(originalMsg);
  }

  // After enabling wildcards option in main.ts, we can use wildcards in our message and event patterns. For eg: to subscribe to
  // all channels starting with notifications, we can use following pattern.
  @EventPattern('notifications*')
  handleWildcardNotifications(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    // To retrieve a reference to the RabbitMQ channel, use the getChannelRef method of the RmqContext object
    console.log(context.getChannelRef());
  }

  // Acts as client
  // To configure message options, we can use RmqRecordBuilder class.
  sendRmqRecord() {
    const message = ':math:';
    const record = new RmqRecordBuilder(message)
      .setOptions({
        headers: { ['x-version']: '1.0.0' },
        priority: 3,
      })
      .build();

    this.client.send('replace-emoji-nats', record).subscribe((res) => {
      console.log(res);
    });
  }

  // Server side - reading options using NatsContext
  @MessagePattern('replace-emoji')
  replaceEmoji(@Payload() data: string, @Ctx() context: RmqContext): string {
    const {
      properties: { headers },
    } = context.getMessage();
    return headers['x-version'] === '1.0.0' ? '🐱' : '🐈';
  }
}
