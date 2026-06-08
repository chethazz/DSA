import { Observable } from 'rxjs';

export interface HelloService {
  bidiHello(upstream: Observable<HelloRequest>): Observable<HelloResponse>;
  lotsOfGreetings(
    upstream: Observable<HelloRequest>,
  ): Observable<HelloResponse>;
}

export interface HelloRequest {
  greeting: string;
}

export interface HelloResponse {
  reply: string;
}
