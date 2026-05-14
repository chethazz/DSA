import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): string {
    return `This returns a cat with #${id}`;
  }

  async throwError() {
    throw new HttpException('Something', HttpStatus.FORBIDDEN);
  }
}
