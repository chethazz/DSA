import { Controller, Inject, OnApplicationBootstrap } from '@nestjs/common';
import {
  Client,
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  NatsContext,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

@Controller('math')
export class MathController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  // Configuring transporter directly -> Not preferred technique since it's harder to test and share a client instance.
  // @Client({
  //   transport: Transport.TCP,
  //   options: {
  //     host: '127.0.0.1',
  //     port: 3000,
  //   },
  // })

  // To create a message handler based on req-res paradigm, use @MessagePattern() decorator.
  // It should only be within a controller as they serve as the entry point for the app

  // In this snippet, accumulate() handler listens for messages that match {cmd: 'sum'} message pattern. Message handler takes
  // a single argument, 'data' passed from client. It is an array of  numbers that need to be accumulated.
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  // Message handler can respons asynchronously.
  @MessagePattern({ cmd: 'sumAsync' })
  async accumulateAsync(data: number[]): Promise<number> {
    return await Promise.resolve((data || []).reduce((a, b) => a + b));
  }

  // Can also return an Observable
  @MessagePattern({ cmd: 'sumObs' })
  accumulateObs(data: number[]): Observable<number> {
    return from(data);
  }

  // To crete an event hadler, use @EventPattern() decorator
  @EventPattern('math_user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    console.log(data);
    return await Promise.resolve('User created');
  }

  // Acessing additional request details
  @MessagePattern('time.us.*')
  getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`);
    return new Date().toLocaleTimeString();
  }
}

// The ClientProxy is lazy. It doesn't initiate a connection immediately. Instead, it will be
// established before the first microservice call, and then reused across each subsequent call.
// However, if you want to delay the application bootstrapping process until a connection is established,
// you can manually initiate a connection using the ClientProxy object's connect() method inside the
// OnApplicationBootstrap lifecycle hook.
// @Controller('math')
export class MathControllerOnBootstrap implements OnApplicationBootstrap {
  @Client({
    transport: Transport.TCP,
    options: { host: 'Some host', port: 3000 },
  })
  private client: ClientProxy;
  async onApplicationBootstrap() {
    try {
      await this.client.connect();
      console.log('Successfully connected to the microservice');
    } catch (error) {
      console.error(error);
    }
  }
}
