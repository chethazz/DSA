import { Metadata, type ServerDuplexStream } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';

@Controller('hello')
export class HelloController {
  @GrpcStreamMethod()
  bidiHello(
    messages: Observable<any>,
    metadata: Metadata,
    call: ServerDuplexStream<any, any>,
  ): Observable<any> {
    const subject = new Subject();

    const onNext = (message) => {
      console.log(message);
      subject.next({
        reply: 'Hello, world!',
      });
    };

    const onComplete = () => subject.complete();
    messages.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
