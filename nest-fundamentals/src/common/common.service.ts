import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private catsService: CatsService,
  ) {}
}

// Order of instantiation is indeterminate. Make sure your code does not depend on which
// constructor is called first. Having circular dependencies depend on providers with
// Scope.REQUEST can lead to undefined dependencies
