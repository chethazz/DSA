import { Controller, Get, Scope } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ scope: Scope.DEFAULT })

// The REQUEST scope bubbles up the injection chain.
// A controller that depends on a request-scoped provider will, itself, be request-scoped.
// CatsController <- CatsService <- CatsRepository. If CatsService is request-scoped (and the
// others are default singletons), the CatsController will become request-scoped as it is
// dependent on the injected service. The CatsRepository, which is not dependent, would
// remain singleton-scoped.

// If a singleton-scoped DogsService injects a transient LoggerService provider, it will
// receive a fresh instance of it. However, DogsService will stay singleton-scoped, so
// injecting it anywhere would not resolve to a new instance of DogsService. In case it's
// desired behavior, DogsService must be explicitly marked as TRANSIENT as well.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
