import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable({ scope: Scope.DEFAULT })
export class AuthService {
  constructor(private readonly user: UsersService) {}
}
