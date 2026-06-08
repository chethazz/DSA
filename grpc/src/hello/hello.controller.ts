import { Metadata, type ServerDuplexStream } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcStreamCall, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { HelloResponse } from './hello';

@Controller('hello')
export class HelloController {
  // Strategy 1: Full-duplex bidi streaming via RxJS Observables
  // We can omit the arguments passed to GrpsStreamMethod() and GrpcStreamCall() if method name here was bidiHello
  // bc nest will infer the names HelloService and bidiHello itself based on the controller name.
  @GrpcStreamMethod('HelloService', 'BidiHello')
  bidiHelloRxJS(
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

  // Strategy 2: Full-duplex bidi streaming via native Node.js call streams
  @GrpcStreamCall('HelloService', 'BidiHello')
  bidiHelloNative(requestStream: ServerDuplexStream<any, any>) {
    requestStream.on('data', (message) => {
      console.log('Native stream server received: ', message);

      requestStream.write({
        reply: 'Hello from native node stream!',
      });
    });

    requestStream.on('end', () => {
      requestStream.end();
    });
  }

  // Can omit arguments here
  @GrpcStreamCall()
  lotsOfGreetings(
    requestStream: ServerDuplexStream<any, any>,
    callback: (err: unknown, value: HelloResponse) => void,
  ) {
    requestStream.on('data', (message) => {
      console.log(message);
    });

    // Access metadata
    requestStream.on('metadata', (metadata: Metadata) => {
      const meta = metadata.get('X-Meta');
      console.log(meta);
    });

    requestStream.on('end', () => callback(null, { reply: 'Hello world!' }));
  }
}
