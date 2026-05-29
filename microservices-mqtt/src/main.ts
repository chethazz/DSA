import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  MqttEvents,
  MqttStatus,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // use AsyncMicroserviceOptions to use useFactory and dynamic microservice configuration
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      // The options property is specific to the chosen transporter. The MQTT transporter
      // exposes the properties described below.
      options: {
        url: 'mqtt://localhost:1883',
        // In some cases we might wanna configure user properties for multiple requests. We can pass these to ClientProxyFactory
        userProperties: { 'x-version': '1.0.0' },
        // Any subscription created with @MP or @EP will subscribe with QoS 0. If a higher QoS is required, it can be set globally
        // using subscriptionOptions block when establishing connection
        subscribeOptions: {
          qos: 2,
        },
      },
    },
  );

  // Subscribing to server's status
  app.status.subscribe((status: MqttStatus) => {
    console.log(status);
  });

  // Listening to internal events of server
  app.on<MqttEvents>('error', (err) => {
    console.error(err);
  });

  // Access server's underlying driver instance
  const mqttClient = app.unwrap<import('mqtt').MqttClient>();

  await app.listen();
}
bootstrap();
