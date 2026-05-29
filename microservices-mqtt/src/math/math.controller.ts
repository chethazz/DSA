import { Controller, Inject, OnApplicationBootstrap } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  MqttContext,
  MqttRecordBuilder,
  MqttStatus,
  Payload,
} from '@nestjs/microservices';

@Controller('math')
export class MathController implements OnApplicationBootstrap {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  onApplicationBootstrap() {
    // To get real time updates on connection and state of underlying instance, we can subscribe to the status stream. This stream
    // provides status updates specific to the chosen driver
    this.client.status.subscribe<MqttStatus>((status: MqttStatus) => {
      console.log(status);
    });

    // In some cases, we might want to listen to internal events emitted by microservice. For eg: we could listen for the error
    // event to trigger additional operation when an error occurs.
    this.client.on('error', (err) => {
      console.error(err);
    });

    // For more advanced use cases, we may need to acess the underlying driver instance. This can be useful for scenarios like
    // manually closing the connection or using driver-specific methods.(Avoid this)
    const mqttClient = this.client.unwrap<import('mqtt').MqttClient>();
  }

  // In complex scenarios, we may need to access additional information about the incoming request.
  // When using MQTT transporter, we can access MqttContext object
  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(context.getTopic());
  }

  // After enabling wildcards option in main.ts, we can use wildcards in our message and event patterns. For eg: to subscribe to
  // all channels starting with notifications, we can use following pattern.
  @EventPattern('notifications.#')
  handleWildcardNotifications(
    @Payload() data: any,
    @Ctx() context: MqttContext,
  ) {
    // To access the original mqtt packet, use the getPacket() method of the MqttContext object
    console.log(context.getPacket());
  }

  // Per-pattern QoS - We can override the MQTT subscription QoS on a per-pattern basis by providing qos in extras field of
  // pattern decorator. When not specified, global subscriptionOptions.qos is used as default.
  @EventPattern('critical-events', { extras: { qos: 0 } })
  handleCriticalEvent(@Payload() data: any) {
    console.log(data);
  }

  // Acts as client
  // To configure message options(adjust QoS, set Retain or DUP flags or add additional props to payload), we can use
  // MqttRecordBuilder class.
  sendMqttRecord() {
    const userProperties = { 'x-version': '1.0.0' };

    const record = new MqttRecordBuilder(':cate:')
      .setProperties({ userProperties })
      .setQoS(1)
      .build();

    this.client.send('replace-emoji', record).subscribe((res) => {
      console.log(res);
    });
  }

  // Server side - reading options using MqttContext
  @MessagePattern('replace-emoji')
  replaceEmoji(@Payload() data: string, @Ctx() context: MqttContext): string {
    const {
      properties: { userProperties },
    } = context.getPacket();
    return userProperties['x-version'] === '1.0.0' ? '🐱' : '🐈';
  }
}
