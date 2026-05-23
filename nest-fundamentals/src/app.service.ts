import { Injectable } from '@nestjs/common';
import { HelloService } from './hello.service';

@Injectable()
export class AppService {
  constructor(private helloService: HelloService) {}
  getHello(): string {
    this.helloService.sysHello('My name is getHello');
    return 'Hello World!';
  }
}
