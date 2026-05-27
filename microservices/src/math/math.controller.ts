import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

@Controller('math')
export class MathController {
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
