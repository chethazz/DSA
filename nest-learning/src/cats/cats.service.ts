import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  async create(cat: Cat) {
    await Promise.resolve();
    console.log(cat);
    return this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): string {
    return `This returns a cat with #${id}`;
  }

  async throwError() {
    await Promise.resolve();
    throw new HttpException('Something', HttpStatus.FORBIDDEN);
  }
}
