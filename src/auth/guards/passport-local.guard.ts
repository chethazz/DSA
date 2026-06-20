import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// We use 'local' because that is the default name of local strategy from passport library
export class PassportLocalGuard extends AuthGuard('local') {}
