import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

// Use INQUIRER to get the class where provider was constructed
@Injectable({ scope: Scope.TRANSIENT })
export class HelloService {
  constructor(@Inject(INQUIRER) private parentClass: object) {}

  sysHello(message: string) {
    console.log(`${this.parentClass?.constructor?.name}: ${message}`);
  }
}
