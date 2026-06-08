import { Controller } from '@nestjs/common';
import { ReplaySubject } from 'rxjs';
import { HelloRequest, type HelloService } from './hello/hello';
import type { HeroesService } from './hero/hero';

@Controller()
export class AppController {
  constructor(
    private readonly heroesService: HeroesService,
    private readonly helloService: HelloService,
  ) {}

  sendStreamingGreetings() {
    const helloRequest$ = new ReplaySubject<HelloRequest>();

    helloRequest$.next({ greeting: 'Hello 1!' });
    helloRequest$.next({ greeting: 'Hello 2!' });
    helloRequest$.complete();

    return this.helloService.bidiHello(helloRequest$);
  }
}
