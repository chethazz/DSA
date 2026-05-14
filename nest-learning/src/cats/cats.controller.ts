import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    return `This creates a cat with ${createCatDto.name}, ${createCatDto.age}, ${createCatDto.breed}`;
  }

  @Get()
  findAll(@Query('age') age: number, @Query('breed') breed: string): string {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }

  // By default build in exceptions like HttpException and those that inherit from this
  // are not shown in console, as they are treated as a part of the application flow
  // same applies to WsException and RpcException
  @Get('error')
  throwError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('error/overidden')
  async throwOveriddenError() {
    try {
      await this.catsService.throwError();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('custom-exception')
  throwCustomException() {
    throw new ForbiddenException();
  }

  // Only if it's an instance of HttpException
  @Get('custom-exception-filter')
  @UseFilters(new HttpExceptionFilter())
  throwCustomExceptionFilter() {
    throw new ForbiddenException();
  }

  @Get('custom-filter-dependency-injection')
  @UseFilters(HttpExceptionFilter)
  throwCustomExceptionFilterWithDI() {
    throw new ForbiddenException();
  }

  // Passing class instead of an instance. Framework handles the instantiation
  // and enables Dependenancy Injection.
  // Prefer applying filters by using class instead of instances. It reduces memory usage
  // since nest can reuse instances of same class
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  // We can instead pass in place instance, allowing us to customize it
  @Get('in-place-instance/:id')
  findOneInPlace(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action deletes a #${id} cat`;
  }
}
