import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CommonService } from '../common/common.service';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class CatsService {
  constructor(
    @Inject(REQUEST)
    @Inject(forwardRef(() => CommonService))
    private context,
  ) {}
}
