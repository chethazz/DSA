import { Metadata } from '@grpc/grpc-js';
import { Controller, Get } from '@nestjs/common';
import type { Hero, HeroesService } from './hero/hero';

@Controller()
export class AppController {
  constructor(private readonly heroesService: HeroesService) {}
}
