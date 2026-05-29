import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class ConfigService {
  get(url: string) {
    return url;
  }

  getMathSvcOptions() {
    return {
      transport: Transport.TCP, // <-- YOU NEED THIS LINE
      options: {
        host: '127.0.0.1',
        port: 3000,
      },
    } as const;
  }
}
